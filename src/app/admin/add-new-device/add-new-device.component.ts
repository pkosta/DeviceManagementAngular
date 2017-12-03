import { Component, OnInit, transition } from '@angular/core';
import { DeviceService } from '../../device.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ViewChild } from '@angular/core';
import { Device } from '../../models/device';
import { InventoryService } from '../../inventory.service';
import { Inventory } from '../../models/inventory';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.css']
})
export class AddNewDeviceComponent {

  device: Device = new Device();
  inventories: Inventory[] = [];
  deviceId: string; // decide the edit mode or new
  
  submitButtonText = "Save Device";
  submitControlDisabled = false;

  deleteButtonText = "Delete Device";
  deleteControlDisabled = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private deviceService: DeviceService) {


    this.deviceId = this.activatedRoute.snapshot.paramMap.get('id');

    this.inventoryService.getAllInventories(inventories => {
      this.inventories = inventories;

      if (this.deviceId) {
        console.log(this.deviceId);
        this.deleteControlDisabled = false;
        this.deviceService.getDeviceWithId(this.deviceId, device => {
          this.device = device;
        });
      }

    });
  }

  onSubmitAddDeviceForm(form: NgForm, event: Event) {
    if (form.valid) {
      this.submitButtonText = "Saving Device..."
      this.submitControlDisabled = true;
      this.deviceService.saveDevice(form.value)
        .then(() => {
          this.submitButtonText = "Add Device";
          this.submitControlDisabled = false;
          form.resetForm();

          this.onBack();
        });
    } else {
      alert("All fields are mandatory. Please fill all the fields");
    }
  }

  onDeleteDevice() {
    if (this.deviceId) {
      this.deleteButtonText = "Deleting Device...";
      this.deviceService.removeDeviceWithId(this.deviceId, status =>{
        if(status) {
          this.deleteButtonText = "Delete Device";
          this.onBack();
        }
      })
    }
  }

  onBack() {
    this.router.navigate(['/admin/manage/devices']);
  }
}
