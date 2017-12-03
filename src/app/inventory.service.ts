import { Injectable } from '@angular/core';
import { Inventory } from './models/inventory';
import * as firebase from 'firebase'
/**
 * single responsibility - dealing the inventory data from server (Firebase).
 * Manage the CRUD of inventory data with Server.
 * Input ==> 
 * Output ==> 
 */
@Injectable()
export class InventoryService {

  constructor() { }

  getAllInventories(callbackFunction) {
    return firebase.database().ref("/inventories").on("value", snapshots => {
      callbackFunction(this.convertDatasnapshotsToInventoryArray(snapshots));
    });
  }

  getInventoryWithId(inventoryId: string, callbackFunction) {
    return firebase.database().ref("/inventories/" + inventoryId).on("value", snapshot => {
      callbackFunction(this.convertDatasnapshotToInventory(snapshot));
    });
  }

  /* Private Mehtods --- Implementation Detaisl */
  private convertDatasnapshotsToInventoryArray(snapshots): Inventory[] {
    let inventories: Inventory[] = [];
    Object.keys(snapshots.val()).forEach(key => {
      let snapShotItem = snapshots.val()[key];

      let inventory: Inventory = { ...snapShotItem, inventoryKey: key };

      inventories.push(inventory);
    });
    return inventories;
  }

  private convertDatasnapshotToInventory(snapshot): Inventory {
    return { ...snapshot.val(), inventoryKey: snapshot.key };
  }

}
