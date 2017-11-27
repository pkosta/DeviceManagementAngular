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

  constructor(private authService: AuthService) { }

  submitLogin() {
    this.authService.createUserWithEmailPassword(this.email, this.password);
  }

}
