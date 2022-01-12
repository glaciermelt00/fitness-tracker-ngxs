import { Injectable }                  from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AuthAction } from './auth.actions';

export interface AuthStateModel {
  isAuthenticated: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isAuthenticated: false
  }
})
@Injectable()
export class AuthState {

  @Action(AuthAction.SetAuthenticated)
  setAuthenticated(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      isAuthenticated: true
    });
  }

  @Action(AuthAction.SetUnauthenticated)
  setUnauthenticated(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      isAuthenticated: false
    });
  }

  @Selector()
  static getIsAuth(state: AuthStateModel) {
    return state.isAuthenticated;
  }
}
