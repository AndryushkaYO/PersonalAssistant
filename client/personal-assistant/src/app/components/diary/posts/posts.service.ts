import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Mood, Post } from './post.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], count: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any, count: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        filter((data) => data.posts && data.posts.length),
        map((data) => { 
          return {
            posts: data.posts.map((el) => ({
              id: el['_id'],
              ...el
            })),
            count: data.count
          };
        })
      )
      .subscribe((postData: any) => {
        this.posts = postData.posts as Array<Post>;
        this.postsUpdated.next({ posts: [...this.posts], count: postData.count });
      });
  }

  addPost(post: Post) {
    let postData;

    if (post.image && typeof(post.image) === 'object') {
      postData = new FormData();
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('date', post.date.toString());
      postData.append('mood', post.mood);
      postData.append('isEdited', ''+post.isEdited);
      postData.append('isOpened', ''+post.isOpened);
      postData.append('labels', post.labels.toString());
      postData.append('image', post.image, post.title);
    } else {
      postData = {...post};
    }

    this.http
      .post<{ message: string, post: Post }>('http://localhost:3000/api/posts', postData)
      .subscribe(responseData => {
        this.posts.push({ ...responseData.post });
        this.postsUpdated.next({posts: [...this.posts], count: this.posts.length});
        this.router.navigate(['/posts']);
      });
  }

  deletePost(id: string) {
    return this.http
    .delete<{ message: string }>('http://localhost:3000/api/posts/' + id);
  }

  updatePost(post: Post, navigate: boolean = true) {
    let postData;

    if (typeof(post.image) === 'object') {
      postData = new FormData();

      postData.append('id', post.id);
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('date', post.date.toString());
      postData.append('mood', post.mood);
      postData.append('isEdited', ''+post.isEdited);
      postData.append('isOpened', ''+post.isOpened);
      postData.append('labels', post.labels.toString());
      postData.append('image', post.image, post.title);
    } else {
      postData = {...post};
    }

    this.http.put('http://localhost:3000/api/posts/' + post.id, postData).subscribe(() => {
      if (navigate) {
        this.router.navigate(['/posts']);
      }
    });
  }

  getPost(id: string) {
    return this.http.get<{ post: {
      _id: string,
      title: string,
      content: string,
      mood: Mood;
      date?: Date;
      labels?: Array<string>;
      isEdited: boolean;
      isOpened: boolean;
    }}>('http://localhost:3000/api/posts/' + id);
  }
}
