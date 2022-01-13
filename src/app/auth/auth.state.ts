import { Injectable }                    from '@angular/core';
import { Emittable, Emitter, Receiver }  from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';

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

  @Emitter(AuthState.setAuthenticated)   static actSetAuthenticated: Emittable<void>;
  @Emitter(AuthState.setUnauthenticated) static actSetUnauthenticated: Emittable<void>;

  @Receiver()
  static setAuthenticated(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      isAuthenticated: true
    });
  }

  @Receiver()
  static setUnauthenticated(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      isAuthenticated: false
    });
  }

  @Selector()
  static getIsAuth(state: AuthStateModel) {
    return state.isAuthenticated;
  }
}
