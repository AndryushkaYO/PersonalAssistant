import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header-block',
  templateUrl: './header-block.component.html',
  styleUrls: ['./header-block.component.scss']
})
export class HeaderBlockComponent implements OnInit, OnDestroy {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Input() isLightTheme: boolean = false;
  @Output() onChangeTheme: EventEmitter<any> = new EventEmitter();
  @Output() onLogClicked: EventEmitter<any> = new EventEmitter();

  private authListenerSubs: Subscription;
  userAuthenticated: boolean = false;

  constructor(public authService: AuthService) { }


  ngOnInit() { 
    this.userAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => this.userAuthenticated = isAuthenticated);
  }
  
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  changeTheme() {
    this.onChangeTheme.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onLogClicked.emit(false);
  }
}
