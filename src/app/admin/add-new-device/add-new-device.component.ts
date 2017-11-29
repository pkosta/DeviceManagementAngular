import { Component, OnInit, transition } from '@angular/core';
import { DeviceService } from '../../device.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.css']
})
export class AddNewDeviceComponent implements OnInit {

  @ViewChild("submitButton") public submitButton : HTMLButtonElement;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
  }

  onSubmitAddDeviceForm(form: NgForm, event: Event) {
    this.submitButton.textContent = "Adding Device...";
    this.submitButton.disabled = true;
    this.deviceService.saveNewDevice(form.value)
      .then(() => {
        this.submitButton.textContent = "Add Device";
        this.submitButton.disabled = false;
        form.resetForm();
      });
  }
}
