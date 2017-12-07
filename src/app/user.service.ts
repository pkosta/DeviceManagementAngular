import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase/app';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { AppUser } from './models/user';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { UserWorklist } from './models/worklist';
import { RequestType } from './models/requesttype.enum';

@Injectable()
export class UserService {

  constructor(
    private afDatabase: AngularFireDatabase) { }


  save(fullName: string, fUser: User) {
    this.afDatabase.object("/users/" + fUser.uid).update({
      name: fullName,
      isAdmin: true,
      email: fUser.email
    });
  }

  getUserWithId(uid: string): AngularFireObject<AppUser> {
    return this.afDatabase.object("/users/" + uid);
  }

  getUserWithIdNative(uid: string, callbackFunction) {
    firebase.database().ref("/users/" + uid).once("value", snapshot => {
      callbackFunction(this.convertDatasnapshotToAppUser(snapshot));
    });
  }

  getAllUsers$(): Observable<{}> {
    return this.afDatabase.list("/users").valueChanges();
  }

  getWorklistForUserId(userId: string, callbackFunction) {
    return firebase.database().ref("/users/" + userId + "/worklist")
      .on("value", snapshots => {
        callbackFunction(this.convertDatasnapshotsToWorklist(snapshots));
      });
  }

  addDeviceToWorklist(adminUserId: string,
    userId: string,
    deviceId: string,
    worklistType: RequestType,
    deviceName: string,
    userName: string) {
    console.log(userId);
    // add device to worklist...here user id will be admin
    return firebase.database().ref("/users/" + adminUserId + "/worklist/" + deviceId)
      .set({
        'userId': userId,
        'requestType': worklistType,
        'userName': userName,
        'deviceName': deviceName
      });
  }

  addDeviceToRequestList(userId: string, deviceId: string) {
    // add device to request list
    return firebase.database().ref("/users/" + userId + "/request/" + deviceId)
      .set("true");
  }

  addDeviceToDeviceList(userId: string, deviceId: string) {
    // add device to request list
    return firebase.database().ref("/users/" + userId + "/device/" + deviceId)
      .set("true");
  }

  removeDeviceFromWorklist(adminUserId: string, deviceId: string) {
    // delete device to worklist...here user id will be admin
    return firebase.database().ref("/users/" + adminUserId + "/worklist/" + deviceId)
      .remove();
  }

  removeDeviceFromRequestList(userId: string, deviceId: string) {
    // delete device from request...here user id will be admin
    return firebase.database().ref("/users/" + userId + "/request/" + deviceId)
      .remove();
  }

  removeDeviceFromDeviceList(userId: string, deviceId: string) {
    // delete device from device...here user id will be admin
    return firebase.database().ref("/users/" + userId + "/device/" + deviceId)
      .remove();
  }

  /******************* Private Methods --- Implementation Details *************/
  private convertDatasnapshotToAppUser(snapshot): AppUser {
    return { name: snapshot.val().name, email: "", isAdmin: false, userId: snapshot.key };
  }

  private convertDatasnapshotsToWorklist(snapshots): UserWorklist[] {
    let worklists: UserWorklist[] = [];
  
    if (snapshots.val() == null || snapshots.val() === undefined) return worklists;

    Object.keys(snapshots.val()).forEach(key => {
      let snapShotItem = snapshots.val()[key];

      let worklist: UserWorklist = {
        ...snapShotItem,
        deviceAssetId: key,
        taskName: "One Item in WorkList" + snapShotItem.requestType
      };

      worklists.push(worklist);
    });
    return worklists;
  }

}
