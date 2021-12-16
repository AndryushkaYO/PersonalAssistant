import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BalanceWheelEditComponent } from './components/balance-wheel/balance-wheel-edit/balance-wheel-edit.component';
import { BalanceWheelComponent } from './components/balance-wheel/balance-wheel.component';
import { PostCreateComponent } from './components/diary/posts/post-create/post-create.component';
import { PostListComponent } from './components/diary/posts/post-list/post-list.component';
import { HabbitsTrackerComponent } from './components/habbits-tracker/habbits-tracker.component';
import { SelectionMenuComponent } from './components/selection-menu/selection-menu.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TodoListEditComponent } from './components/todo-list/todo-list-edit/todo-list-edit.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
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
    canActivate: [AuthGuard]
  },
  {
    path: 'todo',
    component: TodoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'todo/:id',
    component: TodoListEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'balance',
    component: BalanceWheelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'balance/:id',
    component: BalanceWheelEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'selection',
    component: SelectionMenuComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
