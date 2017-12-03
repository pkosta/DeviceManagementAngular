import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../device.service';
import { Device } from '../../models/device';

@Component({
  selector: 'app-manage-devices',
  templateUrl: './manage-devices.component.html',
  styleUrls: ['./manage-devices.component.css']
})
export class ManageDevicesComponent {

  devices: Device[] = [];

  constructor(
    private deviceService: DeviceService
  ) { 
    this.deviceService.getAllDevices(devices => {
      this.devices = devices;
    });
  }


}
