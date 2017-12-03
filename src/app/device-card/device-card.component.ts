import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../models/device';

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
export class DeviceCardComponent {

  @Input() device: Device[];

  @Input() showActions: boolean = true; // if the consumer wants to show no actions

}
