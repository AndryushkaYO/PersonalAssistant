import { Component, OnInit } from '@angular/core';

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

  openSelectionCard() {
    this.isSelectionCardOpen = true;
  }

  closeSelectionCard() {
    this.isSelectionCardOpen = false;
  }

  changeTheme() {
    this.isLightTheme = !this.isLightTheme;
  }

  ngOnInit() { }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
