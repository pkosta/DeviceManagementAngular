import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DeviceService {

  constructor(private afDatabase: AngularFireDatabase) { }

  saveNewDevice(deviceJson) {
    console.log("Saving New Device to Server: " + deviceJson);
    return this.afDatabase.object("/devices/" + deviceJson.deviceAssetId)
      .update(deviceJson);
  }

}
