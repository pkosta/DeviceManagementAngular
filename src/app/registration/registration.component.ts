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

  constructor(private authService: AuthService) { }

  submitLogin(element: any) {
    element.textContent = "Signing up...";
    element.disabled = true;
    this.authService.createUserWithEmailPassword(this.fullName, 
      this.email, 
      this.password);
  }

}
