import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase/app';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { AppUser } from './models/user';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';

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

  private convertDatasnapshotToAppUser(snapshot): AppUser {
    return { name: snapshot.val().name, email: "", isAdmin: false, userId: snapshot.key };
  }

  addDeviceToWorklist(adminUserId: string, deviceId: string) {
    // add device to worklist...here user id will be admin
    return firebase.database().ref("/users/" + adminUserId + "/worklist/" + deviceId)
      .set("true");
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
    // delete device from request...here user id will be admin
    return firebase.database().ref("/users/" + userId + "/device/" + deviceId)
      .remove();
  }

}
