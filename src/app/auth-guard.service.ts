import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {

    return new Promise((resolve, reject) => {
      return this.authService.getLoggedInUser(appUser => {
        console.log("Admin Guard", appUser);
        if (appUser) return resolve(true);
        this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
        return resolve(false);
      })
    });
  }

}
