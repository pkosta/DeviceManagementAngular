import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { RegistrationComponent } from './registration/registration.component';
import { DevicesComponent } from './devices/devices.component';
import { ROUTES } from './app.routes';
import { RequestDeviceComponent } from './request-device/request-device.component';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    LoginComponent,
    RegistrationComponent,
    DevicesComponent,
    RequestDeviceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService, 
    AuthGuardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
