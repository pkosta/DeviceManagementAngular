import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ViewChild } from '@angular/core/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  disableSignInButton = false;
  signInMessage = "Sign In";
  invalidAttempt = false;

  constructor(private authSerive: AuthService) { }

  submitLoginForm(formJsonValue, element) {
    this.signInMessage = "Signing in...";
    this.disableSignInButton = true;
    this.invalidAttempt = false;
    console.log(formJsonValue);
    this.authSerive.loginWithEmailPassword(
      formJsonValue.email,
      formJsonValue.password)
      .catch(error => {
        // login failure
        console.log("Auth Falied");
        this.disableSignInButton = false;
        this.signInMessage = "Sign In";
        this.invalidAttempt = true;
      });
  }
}
