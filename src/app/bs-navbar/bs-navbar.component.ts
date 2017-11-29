import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  appUser: AppUser;

  constructor(public authService: AuthService) {
    this.authService.getAppUser$()
      .subscribe(appUser => {
        if (appUser) {
          this.appUser = appUser;
        } else {
          this.appUser = null;
        }
      })
  }

  logout() {
    this.authService.logout();
  }

}
