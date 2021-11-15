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
    EditHabbitsTrackerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
