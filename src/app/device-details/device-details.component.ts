import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../device.service';
import { Device } from '../models/device';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent {

  deviceId: string;
  device: Device;

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute) {

    this.deviceId = this.route.snapshot.paramMap.get('id');

    this.deviceService.getDeviceWithId(this.deviceId, device => {
      console.log(this.deviceId);
      console.log(this.device);
      this.device = device;
    });

   }

}
