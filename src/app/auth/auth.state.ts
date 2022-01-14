import { Injectable }                    from '@angular/core';
import { Emittable, Emitter, Receiver }  from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';

//--[ Constant ]--------------------------
const STATE_NAME = 'auth';

const STATE_DEFAULTS_VALUES: AuthStateModel = {
  isAuthenticated: false
}

export interface AuthStateModel {
  isAuthenticated: boolean;
}

@State<AuthStateModel>({
  name:     STATE_NAME,
  defaults: STATE_DEFAULTS_VALUES
})
@Injectable()
export class AuthState {

  //--[ Emitter ]--------------------------
  @Emitter(AuthState.setAuthenticated)   static actSetAuthenticated:   Emittable<void>;
  @Emitter(AuthState.setUnauthenticated) static actSetUnauthenticated: Emittable<void>;

  //--[ Receiver ]--------------------------
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

  //--[ Selector ]--------------------------
  @Selector()
  static getIsAuth(state: AuthStateModel) {
    return state.isAuthenticated;
  }
}
