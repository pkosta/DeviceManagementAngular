import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeviceService } from '../device.service';
import { Device } from '../models/device';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../models/inventory';
import { ActivatedRoute } from '@angular/router/';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {

  devices: Device[] = [];
  filteredDevicesForSelectedInventory: Device[] = [];
  filteredDevices: Device[] = [];
  selectedInventory: string;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private deviceService: DeviceService) {

    this.deviceService.getAllDevices(devices => {
      this.filteredDevices =
        this.filteredDevicesForSelectedInventory =
        this.devices = devices;

      this.route.queryParamMap.subscribe(params => {
        this.selectedInventory = params.get('inventory');
        this.applyInventoryFilter();
      })

    });
    //this.deviceService.removeAllDeviceRef(temp);]   
  }

  private applyInventoryFilter() {
    this.filteredDevices = this.filteredDevicesForSelectedInventory =
      (this.selectedInventory) ?
        this.devices.filter(p => p.deviceInventoryId === this.selectedInventory) :
        this.devices;
  }

  filter(query: string) {
    this.filteredDevices = (query) ?
      this.filteredDevicesForSelectedInventory.filter(p => {
        return (p.deviceName.includes(query) ||
          p.deviceDescription.includes(query) ||
          p.deviceOs.includes(query) ||
          p.deviceOsName.includes(query) ||
          //p.deviceOsVersion.indexOf(query) >= 0 ||
          p.deviceSize.includes(query) ||
          p.deviceStatus.includes(query))

      }) :
      this.filteredDevicesForSelectedInventory;
  }

}
