import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { map, Observable } from 'rxjs';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { CurrentUserService } from '../services/current-user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private current: CurrentUserService, private router: Router) {}
  // canActivate()
  // {
  //   return this.current.AuthStatus()
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return JSON.parse(localStorage.getItem('loggedin'));
    // return true;
  }
}
