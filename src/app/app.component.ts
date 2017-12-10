import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private authService: AuthService, router: Router) {
    this.authService.getAuthUser$(user => {
      if (user) {
        console.log("User is Logged In");
        let returnUrl = localStorage.getItem("returnUrl");
        router.navigateByUrl(returnUrl);
      } else {
        console.log("User is Not Logged In");
        router.navigate(['/']);
      }
    });
  }
}
