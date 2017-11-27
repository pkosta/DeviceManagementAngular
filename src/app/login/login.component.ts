import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";

  password: string = "";

  constructor(private authSerive: AuthService) { }

  submitLogin() {
    this.authSerive.loginWithEmailPassword(this.email, this.password);
  }
}
