import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'personal-assistant';
  isSelectionCardOpen = false;
  isLightTheme = true;

  openSelectionCard() {
    this.isSelectionCardOpen = true;
  }

  closeSelectionCard() {
    this.isSelectionCardOpen = false;
  }

  changeTheme() {
    this.isLightTheme = !this.isLightTheme;
  }
}
