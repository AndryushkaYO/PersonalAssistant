import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './components/diary/posts/post-create/post-create.component';
import { PostListComponent } from './components/diary/posts/post-list/post-list.component';
import { MainBlockComponent } from './main-block/main-block.component';

const routes: Routes = [
  {
    path: '',
    component: MainBlockComponent,
  },
  {
    path: 'posts',
    component: PostListComponent,
  },
  {
    path: 'posts/create',
    component: PostCreateComponent,
  },
  {
    path: 'posts/edit/:postId',
    component: PostCreateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
