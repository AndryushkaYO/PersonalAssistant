import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'personal-assistant';
  isSelectionCardOpen = false;
  isLightTheme = true;
  sideBarOpen = false;
  showSideBar = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();

    if (this.authService.getIsAuth()) {
      this.sideBarOpen = true;
      this.showSideBar = true;
    }
  }

  openSelectionCard() {
    this.isSelectionCardOpen = true;
  }

  closeSelectionCard() {
    this.isSelectionCardOpen = false;
  }

  changeTheme() {
    this.isLightTheme = !this.isLightTheme;
  }

  sideBarToggler() {
    if (this.authService.getIsAuth()) {
      this.sideBarOpen = !this.sideBarOpen;
      this.showSideBar = true;
    }
    else {
      this.showSideBar = false;
    }
  }

  log() {
    this.showSideBar = false;
  }
}
