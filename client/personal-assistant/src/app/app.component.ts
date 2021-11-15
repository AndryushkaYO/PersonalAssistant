import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
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
    this.sideBarOpen = !this.sideBarOpen;
  }
}
