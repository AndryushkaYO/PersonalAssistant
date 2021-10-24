import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { title } from 'process';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(
        map((data) => data.posts.map((el) => ({
          id: el['_id'],
          title: el.title,
          content: el.content
        })))
      )
      .subscribe((postData: Array<Post>) => {
        this.posts = postData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        this.posts.push({ ...post, id: responseData.postId });
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(id: string) {
    this.http
    .delete<{ message: string }>('http://localhost:3000/api/posts/' + id)
    .subscribe(() => {
      this.posts = this.posts.filter(el => el.id !== id);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
