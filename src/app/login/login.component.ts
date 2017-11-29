import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authSerive: AuthService) { }

  submitLoginForm(formJsonValue, element) {
    element.textContent = "Signing in...";
    element.disabled = true;
    console.log(formJsonValue);
    this.authSerive.loginWithEmailPassword(
      formJsonValue.email,
      formJsonValue.password);
  }
}
