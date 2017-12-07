import { Component, OnInit, Input, transition } from '@angular/core';
import { Device } from '../models/device';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/user';
import { WorkflowService } from '../workflow.service';
import { EDeviceCardButtonVisible } from '../models/card.device.button.visible.enum';
import { when } from 'q';
import { User } from 'firebase';

/**
 * Clean and Beutiful Class
 * single responsibility - displaying the card.
 * Manage the look and feel of the card.
 * Input ==> 1. device object of Device 
 * Output ==> 
 */

@Component({
  selector: 'device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent implements OnInit {

  @Input() device: Device;
  @Input() showActions: boolean = true; // if the consumer wants to show no actions
  userAssociatedDevice: AppUser;
  loggedInUser: AppUser;

  mutableDevice: Device;
  requestButtonVisible: boolean = false;
  cancelRequestVisible: boolean = false;
  returnRequestVisible: boolean = false;
  disableButton: boolean = true;

  constructor(
    private workflowService: WorkflowService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.mutableDevice = new Device();
    Object.assign(this.mutableDevice, this.device);

    this.authService.getLoggedInUser(loggedInUser => {
      console.log("Logged In User", loggedInUser);
      this.loggedInUser = loggedInUser;
      this.deviceCardButtonsVisibility();
      if (this.mutableDevice.userId) {
        this.userService.getUserWithIdNative(this.mutableDevice.userId, user => {
          this.userAssociatedDevice = user;
        });
      }
    })
  }

  onCardClick() {
    this.router.navigate(['/devices-details', this.mutableDevice.deviceAssetId]);
  }

  onRequestDeviceClick(device: Device) {
    this.workflowService.requestDeviceForId(device,
      this.loggedInUser);
  }

  onCancelRequestClick(device: Device) {
    this.workflowService.withdrawDeviceRequestForId(device.deviceAssetId,
      this.loggedInUser.userId);
  }

  onReturnRequestClick(device: Device) {
    this.workflowService.returnRequestForId(device,
      this.loggedInUser);
  }

  /****** Private Methods --- Implementation Details ******/
  private deviceCardButtonsVisibility() {
    let visibleButton = this.mutableDevice.getCardButton(this.loggedInUser.userId);
    this.visibleButtonWithVisibleButton(visibleButton);
  }

  private visibleButtonWithVisibleButton(visibleButton: EDeviceCardButtonVisible) {
    switch (visibleButton) {
      case EDeviceCardButtonVisible.REQUEST_BUTTON:
        this.requestButtonVisible = true;
        this.cancelRequestVisible = false;
        this.returnRequestVisible = false;
        this.disableButton = false;
        break;
      case EDeviceCardButtonVisible.CANCEL_BUTTON:
        this.requestButtonVisible = false;
        this.cancelRequestVisible = true;
        this.returnRequestVisible = false;
        this.disableButton = false;
        break;
      case EDeviceCardButtonVisible.RETURN_BUTTON:
        this.requestButtonVisible = false;
        this.cancelRequestVisible = false;
        this.returnRequestVisible = true;
        this.disableButton = false;
        break;
      case EDeviceCardButtonVisible.NO_BUTTON:
        this.requestButtonVisible = false;
        this.cancelRequestVisible = false;
        this.returnRequestVisible = false;
        this.disableButton = true;
        break;
    }
  }
}
