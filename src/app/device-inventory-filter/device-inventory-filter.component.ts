import { Component, OnInit, Input } from '@angular/core';
import { Inventory } from '../models/inventory';
import { InventoryService } from '../inventory.service';
/**
 * single responsibility - displaying the inventories with selected inventory as input.
 * Manage the list of inventories and highlight the selected inventory
 * Input ==> 1. selected inventory 
 * Output ==> 
 */
@Component({
  selector: 'device-inventory-filter',
  templateUrl: './device-inventory-filter.component.html',
  styleUrls: ['./device-inventory-filter.component.css']
})
export class DeviceInventoryFilterComponent {

  inventories: Inventory[] = [];
  @Input() selectedInventoryId: string;

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.getAllInventories(inventories => {
      this.inventories = inventories;
    })
  }

}
