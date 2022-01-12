import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
}                      from '@angular/router';
import { Injectable }  from '@angular/core';
import { Select }      from '@ngxs/store';

import { Observable } from 'rxjs';
import { take }       from 'rxjs/operators';

import { AuthState } from './auth.state';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  @Select(AuthState.getIsAuth) getIsAuth$: Observable<boolean>;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.getIsAuth$.pipe(take(1));
  }

  canLoad(route: Route) {
    return this.getIsAuth$.pipe(take(1));
  }
}
