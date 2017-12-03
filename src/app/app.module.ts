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
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageDevicesComponent } from './admin/manage-devices/manage-devices.component';
import { AdminGuardService } from './admin-guard.service';
import { ManageInventoryComponent } from './admin/manage-inventory/manage-inventory.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddNewDeviceComponent } from './admin/add-new-device/add-new-device.component';
import { DeviceService } from './device.service';
import { UserComponent } from './user/user.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DeviceCardComponent } from './device-card/device-card.component';
import { InventoryService } from './inventory.service';
import { DeviceInventoryFilterComponent } from './device-inventory-filter/device-inventory-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    LoginComponent,
    RegistrationComponent,
    DevicesComponent,
    RequestDeviceComponent,
    ManageUsersComponent,
    ManageDevicesComponent,
    ManageInventoryComponent,
    MyProfileComponent,
    AddNewDeviceComponent,
    UserComponent,
    InventoryComponent,
    DeviceCardComponent,
    DeviceInventoryFilterComponent
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
    UserService,
    AdminGuardService,
    DeviceService,
    InventoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
