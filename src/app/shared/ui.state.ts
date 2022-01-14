import { Injectable }                    from '@angular/core';
import { Emittable, Emitter, Receiver }  from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';

//--[ Constant ]--------------------------
const STATE_NAME = 'ui';

const STATE_DEFAULTS_VALUES: UIStateModel = {
  isLoading: false
}

export interface UIStateModel {
  isLoading: boolean;
}

@State<UIStateModel>({
  name:     STATE_NAME,
  defaults: STATE_DEFAULTS_VALUES
})
@Injectable()
export class UIState {

  //--[ Emitter ]--------------------------
  @Emitter(UIState.startLoading) static actStartLoading: Emittable<void>;
  @Emitter(UIState.stopLoading)  static actStopLoading:  Emittable<void>;

  //--[ Receiver ]--------------------------
  @Receiver()
  static startLoading(ctx: StateContext<UIStateModel>) {
    ctx.setState({
      isLoading: true
    });
  }

  @Receiver()
  static stopLoading(ctx: StateContext<UIStateModel>) {
    ctx.setState({
      isLoading: false
    });
  }

  //--[ Selector ]--------------------------
  @Selector()
  static getIsLoading(state: UIStateModel) {
    return state.isLoading;
  }
}
