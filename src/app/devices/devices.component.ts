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
        return (p.deviceName.toLowerCase().includes(query.toLowerCase()) ||
          p.deviceDescription.toLowerCase().includes(query.toLowerCase()) ||
          p.deviceOs.toLowerCase().includes(query.toLowerCase()) ||
          p.deviceOsName.toLowerCase().includes(query.toLowerCase()) ||
          p.deviceOsVersion.toString().toLowerCase().includes(query.toString().toLowerCase()) ||
          p.deviceSize.toLowerCase().includes(query.toLowerCase()) ||
          p.deviceStatus.toLowerCase().includes(query.toLowerCase()))

      }) :
      this.filteredDevicesForSelectedInventory;
  }

}
