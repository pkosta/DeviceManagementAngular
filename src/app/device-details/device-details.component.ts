import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../device.service';
import { Device } from '../models/device';
import { AppUser } from '../models/user';
import { UserService } from '../user.service';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../models/inventory';
import { EDeviceCardButtonVisible } from '../models/card.device.button.visible.enum';
import { AuthService } from '../auth.service';
import { WorkflowService } from '../workflow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent {

  deviceId: string;
  device: Device;
  userAssociatedDevice: AppUser;
  inventoryName: string;
  mutableDevice: Device;
  loggedInUser: AppUser;

  requestButtonVisible: boolean = false;
  cancelRequestVisible: boolean = false;
  returnRequestVisible: boolean = false;
  disableButton: boolean = true;

  constructor(
    private router: Router,
    private workflowService: WorkflowService,
    private authService: AuthService,
    private userService: UserService,
    private inventoryService: InventoryService,
    private deviceService: DeviceService,
    private route: ActivatedRoute) {

    this.mutableDevice = new Device();
    this.deviceId = this.route.snapshot.paramMap.get('id');

    this.deviceService.getDeviceWithId(this.deviceId, device => {
      this.device = device;
      // only for method calling
      Object.assign(this.mutableDevice, this.device);
      this.populateData();
    });
  }

  populateData() {
    // getting and setting inventory
    this.inventoryService.getInventoryWithId(
      this.device.deviceInventoryId, inventory => {
        this.inventoryName = inventory.name;
      });
    // getting and setting associated user if user id present
    if (this.device.userId) {
      this.userService.getUserWithIdNative(this.device.userId, user => {
        this.userAssociatedDevice = user;
      });
    }
    // now put up the user specific data...
    // 1. check if the user is log in
    // 2. if login...show the cancel and return button
    this.updateInfoBasedOnLoggedInUser();
  }

  onRequestDeviceClick(device: Device) {
    if (!this.loggedInUser) {
      localStorage.setItem("returnUrl", "/");
      this.router.navigate(['/signin']);
    } else {
      this.workflowService.requestDeviceForId(device,
        this.loggedInUser);
    }
  }

  onCancelRequestClick(device: Device) {
    if (!this.loggedInUser) {
      localStorage.setItem("returnUrl", "/");
      this.router.navigate(['/signin']);
    } else {
      this.workflowService.withdrawDeviceRequestForId(device.deviceAssetId,
        this.loggedInUser.userId);
    }
  }

  onReturnRequestClick(device: Device) {
    if (!this.loggedInUser) {
      localStorage.setItem("returnUrl", "/");
      this.router.navigate(['/signin']);
    } else {
      this.workflowService.returnRequestForId(device,
        this.loggedInUser);
    }
  }

  /****** Private Methods --- Implementation Details ******/

  private initiateButtonVisibility() {
    this.requestButtonVisible = this.mutableDevice.isDeviceAvailable();
    this.disableButton = this.mutableDevice.isDeviceIssued()
      || this.mutableDevice.isDeviceRequested() || this.mutableDevice.isDeviceReturnRequested() || !this.mutableDevice.isDeviceAvailable();
    this.cancelRequestVisible = false;
    this.returnRequestVisible = false;
  }

  private updateInfoBasedOnLoggedInUser() {
    this.authService.getAuthUser$(loggedInAppUser => {
      this.loggedInUser = loggedInAppUser;
      this.initiateButtonVisibility()
      if (loggedInAppUser != null) {
        if (this.device.userId && this.device.userId === loggedInAppUser.userId) {
          // if the associated user logged in user
          this.changeButtonsForLoggedInUser();
        }
      }
    });
  }

  private changeButtonsForLoggedInUser() {
    this.cancelRequestVisible = this.mutableDevice.isDeviceRequested();
    this.returnRequestVisible = this.mutableDevice.isDeviceIssued();
    this.requestButtonVisible = this.mutableDevice.isDeviceAvailable();
    this.disableButton = this.mutableDevice.isDeviceReturnRequested();
  }

  private calculateTimeDifference() {
    let dateStr = "";

    let timestamp = this.device.timestamp;
    let diff = new Date().getTime() - new Date(timestamp).getTime();

    let minutes = Math.floor(diff / 1000 / 60);
    let hours = Math.floor(diff / 1000 / 60 / 60);
    let days = Math.floor(diff / 1000 / 60 / 60 / 24);

    minutes = minutes - (hours * 60);
    hours = hours - (days * 24);

    if (days > 1) {
      dateStr = dateStr + days + " days ";
    } else if (days == 1) {
      dateStr = dateStr + days + " day ";
    }

    if (hours > 1) {
      dateStr = dateStr + hours + " hours ";
    } else if (hours == 1) {
      dateStr = dateStr + hours + " hour ";
    }

    if (minutes > 1) {
      dateStr = dateStr + minutes + " minutes ";
    } else if (minutes == 1) {
      dateStr = dateStr + minutes + " minute ";
    }

    if (days === 0 && hours === 0 && minutes === 0) {
      return "Just Now"
    }

    return dateStr;
  }
}
