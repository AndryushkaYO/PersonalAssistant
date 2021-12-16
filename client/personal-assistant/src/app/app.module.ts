import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderBlockComponent } from './header-block/header-block.component';
import { MainBlockComponent } from './main-block/main-block.component';
import { SideBlockComponent } from './side-block/side-block.component';
import { FooterBlockComponent } from './footer-block/footer-block.component';
import { SelectionMenuComponent } from './components/selection-menu/selection-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostCreateComponent } from './components/diary/posts/post-create/post-create.component';
import { PostListComponent } from './components/diary/posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HabbitsTrackerComponent } from './components/habbits-tracker/habbits-tracker.component';
import { EditHabbitsTrackerComponent } from './components/habbits-tracker/edit-habbits-tracker/edit-habbits-tracker.component';
import { TodoListEditComponent } from './components/todo-list/todo-list-edit/todo-list-edit.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { BalanceWheelEditComponent } from './components/balance-wheel/balance-wheel-edit/balance-wheel-edit.component';
import { BalanceWheelComponent } from './components/balance-wheel/balance-wheel.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBlockComponent,
    MainBlockComponent,
    SideBlockComponent,
    FooterBlockComponent,
    SelectionMenuComponent,
    PostCreateComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    HabbitsTrackerComponent,
    EditHabbitsTrackerComponent,
    TodoListEditComponent,
    TodoListComponent,
    BalanceWheelEditComponent,
    BalanceWheelComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
