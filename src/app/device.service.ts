import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase'
import { Device } from './models/device';
import { EDeviceStatus } from './models/devicestatus.enum';

@Injectable()
export class DeviceService {

  constructor(private afDatabase: AngularFireDatabase) { }

  saveDevice(deviceJson) {
    console.log("Saving New Device to Server: " + deviceJson);
    return this.afDatabase.object("/devices/" + deviceJson.deviceAssetId)
      .update(deviceJson);
  }

  getAllDevices(callbackFunction) {
    return firebase.database().ref("/devices").on("value", snapshots => {
      callbackFunction(this.convertDatasnapshotsToDeviceArray(snapshots));
    });
  }

  getDeviceWithId(deviceAssetId: string, callbackFunction) {
    firebase.database().ref("/devices/" + deviceAssetId).once("value", snapshot => {
      callbackFunction(this.convertDatasnapshotToDevice(snapshot));
    })
  }

  removeDeviceWithId(deviceAssetId: string, callbackFunction) {
    firebase.database().ref("/devices/" + deviceAssetId).remove()
      .then(() => {
        callbackFunction(true);
      });
  }

  removeAllDeviceRef(callbackFunction) {
    firebase.database().ref("/devices").off("value", callbackFunction);
  }


  getAllDevices$(): Observable<{}> {
    return this.afDatabase.list("/devices").valueChanges();
  }

  addUserIdToDevice(deviceId: string, userId: string) {
    firebase.database().ref("/devices/" + deviceId).update({
      'userId': userId
    });
  }

  updateDeviceStatus(deviceId: string, status: EDeviceStatus) {
    firebase.database().ref("/devices/" + deviceId).update({
      'deviceStatus': status
    });
  }

  removeUserIdFromDevice(deviceId: string, userId: string) {
    firebase.database().ref("/devices/" + deviceId + "/userId")
      .remove();
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

  private convertDatasnapshotToDevice(snapshot): Device {
    return { ...snapshot.val(), deviceAssetId: snapshot.key };
  }

}
