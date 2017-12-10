import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AppUser } from '../models/user';
import { AuthService } from '../auth.service';
import { DeviceService } from '../device.service';
import { Device } from '../models/device';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  loggedInAppUser: AppUser;
  userIssuedDevices: Device[] = [];
  userRequestedDevices: Device[] = [];

  constructor(
    private deviceService: DeviceService,
    private authService: AuthService) {

    this.authService.getLoggedInUser(appUser => {
      if (appUser == null) return;
      this.loggedInAppUser = appUser;
      this.getUserIssuedDevices(this.loggedInAppUser.issuedDevices);
      this.getUserRequestedDevices(this.loggedInAppUser.requestedDevices);
    });

  }

  ngOnInit() {
  }

  issuedDevicesPresentForUser() {
    if (this.loggedInAppUser.issuedDevices.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  requestedDevicesPresentForUser() {
    if (this.loggedInAppUser.requestedDevices.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getRoleWithIsAdminProperty() {
    if (this.loggedInAppUser.isAdmin) {
      return "Admin"
    } else {
      return "Device User"
    }
  }

  private getUserIssuedDevices(deviceIds: string[]) {
    this.deviceService.getDeviceDetailsWithDeviceIds(deviceIds, devices => {
      this.userIssuedDevices = devices;
      console.log("Issued Devices", this.userIssuedDevices);
    });
  }

  private getUserRequestedDevices(deviceIds: string[]) {
    this.deviceService.getDeviceDetailsWithDeviceIds(deviceIds, devices => {
      this.userRequestedDevices = devices;
      console.log("Requested Devices", this.userRequestedDevices);
    });
  }

}
