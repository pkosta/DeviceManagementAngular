import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(authService: AuthService, router: Router) {
    authService.user$.subscribe(user => {
      console.log("Auth State Changed");
      if (user) {
        let returnUrl = localStorage.getItem("returnUrl");
        console.log("Return Url: "+returnUrl);
        router.navigateByUrl(returnUrl);
      } else {
        router.navigate(['/']);
        console.log("User is Null")
      }
    }); 
  }

}
