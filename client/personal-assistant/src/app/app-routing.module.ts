import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostCreateComponent } from './components/diary/posts/post-create/post-create.component';
import { PostListComponent } from './components/diary/posts/post-list/post-list.component';
import { HabbitsTrackerComponent } from './components/habbits-tracker/habbits-tracker.component';
import { MainBlockComponent } from './main-block/main-block.component';

const routes: Routes = [
  {
    path: '',
    component: MainBlockComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts',
    component: PostListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/create',
    component: PostCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/edit/:postId',
    component: PostCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'habbits',
    component: HabbitsTrackerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
