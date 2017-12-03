import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase'
import { Device } from './models/device';

@Injectable()
export class DeviceService {

  constructor(private afDatabase: AngularFireDatabase) { }

  saveNewDevice(deviceJson) {
    console.log("Saving New Device to Server: " + deviceJson);
    return this.afDatabase.object("/devices/" + deviceJson.deviceAssetId)
      .update(deviceJson);
  }

  getAllDevices$(): Observable<{}> {
    return this.afDatabase.list("/devices").valueChanges();
  }

  getAllDevices(callbackFunction) {
    return firebase.database().ref("/devices").on("value", snapshots => {
      callbackFunction(this.convertDatasnapshotsToDeviceArray(snapshots));
    });
  }

  removeAllDeviceRef(callbackFunction) {
    firebase.database().ref("/devices").off("value", callbackFunction);
  }

  /* Private Mehtods --- Implementation Detaisl */
  private convertDatasnapshotsToDeviceArray(snapshots): Device[] {
    let devices: Device[] = [];
    Object.keys(snapshots.val()).forEach(key => {
      let snapShotItem = snapshots.val()[key];

      let device: Device = {
        ...snapShotItem,
        deviceAssetId: key
      };

      devices.push(device);
    });
    return devices;
  }

}
