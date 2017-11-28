import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase/app';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { AppUser } from './models/user';

@Injectable()
export class UserService {

  constructor(private afDatabase: AngularFireDatabase) { }


  save(fullName: string, fUser: User) {
    this.afDatabase.object("/users/"+fUser.uid).update({
      name: fullName,
      isAdmin: true,
      email: fUser.email
    });
  }

  getUserWithId(uid: string): AngularFireObject<AppUser> {
    return this.afDatabase.object("/users/"+uid);
  }

}
