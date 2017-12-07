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
      callbackFunction(this.convertDatasnapshotsToDeviceArray(snapshots.val()));
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

  /**
       * methods to get list of devices with all device ids passed a parameter.
       * @param deviceIdKeys , device ids passed
       */
  getDeviceDetailsWithDeviceIds(deviceIdKeys: string[], callbackFunction) {

    //https://stackoverflow.com/questions/42610264/querying-by-multiple-keys-in-firebase
    var fun = function (key) {
      return firebase.database().ref('/devices/')
        .child(key)
        .once('value');
    };
    var promises = deviceIdKeys.map(fun);
    Promise.all(promises).then(snapshots => {
      callbackFunction(this.convertDatasnapshotsToDeviceArray2(snapshots));
    });
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
    Object.keys(snapshots).forEach(key => {
      let snapShotItem = snapshots[key];

      let device: Device = {
        ...snapShotItem,
        deviceAssetId: key
      };

      devices.push(device);
    });
    return devices;
  }

  private convertDatasnapshotsToDeviceArray2(snapshots): Device[] {
    let devices: Device[] = [];
    snapshots.forEach(snapshot => {
      let device: Device = {
        ...snapshot.val(),
        deviceAssetId: snapshot.key
      };
      devices.push(device);
    });
    return devices;
  }

  private convertDatasnapshotToDevice(snapshot): Device {
    return { ...snapshot.val(), deviceAssetId: snapshot.key };
  }

}
