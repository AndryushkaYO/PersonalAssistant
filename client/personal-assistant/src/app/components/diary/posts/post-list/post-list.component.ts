import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Mood, Post } from "../post.model";
import { PostsService } from "../posts.service";
import { moodsIcons } from "../post.model";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading: boolean = false;
  moodsIcons = moodsIcons;
  pageSize: number = 2;
  postsAmount: number = 0;
  currentPage: number = 1;

  moods() : Array<string> {
    const mood = Mood;
    var keys = Object.keys(mood);

    return keys;
  }

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.pageSize, 1);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((data: { posts: Post[]; count: number }) => {
        this.posts = data.posts;
        this.postsAmount = data.count;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(id: string) {
    this.postsService.deletePost(id).subscribe(() => {
      this.postsService.getPosts(this.pageSize, this.currentPage);
    });
;
  }

  openPost(post: Post) {
    this.postsService.updatePost({
      ...post,
      isOpened: !post.isOpened
    }, false);
  }

  onPageChange(page: PageEvent) {
    this.isLoading = true;
    this.pageSize = page.pageSize;
    this.currentPage = page.pageIndex + 1;
    this.postsAmount = page.length;
    this.postsService.getPosts(page.pageSize, page.pageIndex + 1);
  }
}
