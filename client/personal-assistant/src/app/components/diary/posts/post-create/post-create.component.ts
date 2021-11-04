import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Mood, moodsIcons, Post } from "../post.model";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { PostsService } from "../posts.service";
// import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  post: Post;
  isLoading: boolean = false;
  form: FormGroup;

  private isEditMode: boolean = false;
  private postId: string;

  imagePreview: string;
  
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  labels = [];
  moodsIcons = moodsIcons;

  moods() : Array<string> {
    const mood = Mood;
    var keys = Object.keys(mood);

    return keys.reverse();
  }

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl('', /*{ asyncValidators: [mimeType] }*/),
      mood: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isEditMode = true;
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((data) => {
          this.isLoading = false;
          this.post = {
            ...data.post,
            id: data.post._id
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
            mood: this.post.mood,
          });
          this.labels = this.post.labels;
          this.imagePreview = this.post.imagePath
        });
      } else {
        this.isEditMode = false;
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    const post = {
      id: this.postId,
      title: this.form.value.title,
      content: this.form.value.content,
      mood: this.form.value.mood,
      labels: this.labels || [],
      isEdited: false,
      image: this.form.value.image
    };

    if (this.isEditMode) {
      this.postsService.updatePost({
        ...post,
        date: this.post.date,
        isEdited: true,  
        isOpened: this.post.isOpened      
      });
    } else {
      this.postsService.addPost({
        ...post,
        date: new Date(),
        isOpened: true
      });
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.labels.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(label: string): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }
}
