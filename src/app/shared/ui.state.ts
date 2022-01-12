import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext }      from '@ngxs/store';

import { UIAction } from './ui.actions';

export interface UIStateModel {
  isLoading: boolean;
}

@State<UIStateModel>({
  name: 'ui',
  defaults: {
    isLoading: false
  },
})
@Injectable()
export class UIState {

  @Action(UIAction.StartLoading)
  startLoading(ctx: StateContext<UIStateModel>) {
    ctx.setState({
      isLoading: true
    });
  }

  @Action(UIAction.StopLoading)
  stopLoading(ctx: StateContext<UIStateModel>) {
    ctx.setState({
      isLoading: false
    });
  }

  @Selector()
  static getIsLoading(state: UIStateModel) {
    return state.isLoading;
  }
}
