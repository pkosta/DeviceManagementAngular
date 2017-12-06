import { Component } from "@angular/core/src/metadata/directives";
import { DevicesComponent } from "./devices/devices.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RequestDeviceComponent } from "./request-device/request-device.component";
import { AuthGuardService } from "./auth-guard.service";
import { ManageDevicesComponent } from "./admin/manage-devices/manage-devices.component";
import { ManageUsersComponent } from "./admin/manage-users/manage-users.component";
import { AdminGuardService } from "./admin-guard.service";
import { ManageInventoryComponent } from "./admin/manage-inventory/manage-inventory.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { AddNewDeviceComponent } from "./admin/add-new-device/add-new-device.component";
import { UserComponent } from "./user/user.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { MyWorklistComponent } from "./admin/my-worklist/my-worklist.component";
import { DeviceDetailsComponent } from "./device-details/device-details.component";

export const ROUTES = [
    { path: '', component: DevicesComponent },
    { path: 'devices', component: DevicesComponent },
    { path: 'devices-details/:id', component: DeviceDetailsComponent },
    { path: 'users', component: UserComponent },
    { path: 'inventories', component: InventoryComponent },
    { path: 'signin', component: LoginComponent },
    { path: 'signup', component: RegistrationComponent },

    // protected by the auth guard service
    {
        path: 'requestdevice',
        component: RequestDeviceComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'myprofile',
        component: MyProfileComponent,
        canActivate: [AuthGuardService]
    },

    // protected by the auth guard service and admin users
    {
        path: 'admin/manage/worklist',
        component: MyWorklistComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    },
    {
        path: 'admin/manage/devices',
        component: ManageDevicesComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    },
    {
        path: 'admin/manage/users',
        component: ManageUsersComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    },
    {
        path: 'admin/manage/inventories',
        component: ManageInventoryComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    },
    {
        path: 'admin/manage/devices/add-new',
        component: AddNewDeviceComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    },
    {
        path: 'admin/manage/devices/:id',
        component: AddNewDeviceComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    }
];