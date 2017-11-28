import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/user';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;   // dollar $ sign to the observable

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private activateRoute: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  loginWithEmailPassword(email: string, password: string) {
    // storing the return url so that when the user logged in...
    // we can redirect the user to the page...he was interested in to checked
    let returnUrl = this.activateRoute.snapshot.queryParamMap.get("returnUrl")
      || "/"; // if return url exist or the root otherwise
    localStorage.setItem("returnUrl", returnUrl);
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  createUserWithEmailPassword(
    fullName: string,
    email: string,
    password: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        // saving the user in the database
        this.userService.save(fullName, user);
      });
  }

  getAppUser$():Observable<AppUser>{
    return this.user$.switchMap(user => {
      if(user) {
        return this.userService.getUserWithId(user.uid).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

}
