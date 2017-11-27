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

    return this.authService.user$.map(user => {
      console.log("User from Guard Service: "+user);
      if (user) return true;
      this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
      return false;
    });

  }

}
