import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/user';
import { User } from 'firebase';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute) {
  }

  public loginWithEmailPassword(email: string, password: string) {
    // storing the return url so that when the user logged in...
    // we can redirect the user to the page...he was interested in to checked
    let returnUrl = this.activateRoute.snapshot.queryParamMap.get("returnUrl")
      || "/"; // if return url exist or the root otherwise
    localStorage.setItem("returnUrl", returnUrl);
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  public createUserWithEmailPassword(
    fullName: string,
    email: string,
    password: string) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        // saving the user in the database
        this.userService.save(fullName, user);
      });
  }

  public logout() {
    firebase.auth().signOut();
  }

  public getAuthUser$(callbackFunction) {
    return firebase.auth().onAuthStateChanged(loggedInUser => {
      if (loggedInUser == null) {
        callbackFunction(null);
      } else {
        this.userService.getUserWithIdNative(loggedInUser.uid, loggedInAppUser => {
          callbackFunction(loggedInAppUser);
        })
      }
    });
  }

  getLoggedInUser(callbackFunction) {
    let user = firebase.auth().currentUser;
    if (user) {
      let loggedInUserId = firebase.auth().currentUser.uid;
      return this.userService.getUserWithIdNative(loggedInUserId, appUser => {
        callbackFunction(appUser);
      });
    } else {
      callbackFunction(null);
    }
  }

  getLoggedInUser$(callbackFunction) {
    console.log("HELLO", firebase.auth().currentUser);
    let user: User = firebase.auth().currentUser;
    if (user.uid) {
      let loggedInUserId = user.uid;
      this.userService.getUserWithIdNative(loggedInUserId, appUser => {
        callbackFunction(appUser);
      });
    } else {
      callbackFunction(null);
    }
  }

  isUserLoggedIn(): boolean {
    console.log("kjahfkjdgsa", firebase.auth().currentUser);
    if (firebase.auth().currentUser) return true;
    return false;
  }
}
