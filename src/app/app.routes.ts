import { Component } from "@angular/core/src/metadata/directives";
import { DevicesComponent } from "./devices/devices.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RequestDeviceComponent } from "./request-device/request-device.component";
import { AuthGuardService } from "./auth-guard.service";

export const ROUTES = [
    { path: '', component: DevicesComponent },
    { path: 'signin', component: LoginComponent },
    { path: 'signup', component: RegistrationComponent },

    // protected by the auth guard service
    {
        path: 'requestdevice', 
        component: RequestDeviceComponent,
        canActivate: [AuthGuardService]
    }
];