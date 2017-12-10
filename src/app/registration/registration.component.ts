import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  email: string = "";
  password: string = "";
  fullName: string = "";

  disableSignUpButton = false;
  signUpMessage = "Sign Up";

  constructor(private authService: AuthService) { }

  submitLogin(element: any) {
    this.signUpMessage = "Signing up...";
    this.disableSignUpButton = true;
    this.authService.createUserWithEmailPassword(this.fullName, 
      this.email, 
      this.password);
  }

}
