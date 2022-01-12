import { Injectable }                            from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { Exercise }        from './exercise.model';
import { TrainingAction }  from './training.actions';

export interface TrainingStateModel {
  availableExercises: Exercise[];
  finishedExercises:  Exercise[];
  activeTraining:     Exercise
}

@State<TrainingStateModel>({
  name: 'training',
  defaults: {
    availableExercises: [],
    finishedExercises:  [],
    activeTraining:     null
  }
})
@Injectable()
export class TrainingState {

  @Action(TrainingAction.SetAvailable)
  setAvailable(ctx: StateContext<TrainingStateModel>, action: TrainingAction.SetAvailable) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      availableExercises: action.payload
    });
  }

  @Action(TrainingAction.SetFinished)
  setFinished(ctx: StateContext<TrainingStateModel>, action: TrainingAction.SetFinished) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      finishedExercises: action.payload
    });
  }

  @Action(TrainingAction.Start)
  start(ctx: StateContext<TrainingStateModel>, action: TrainingAction.Start) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
    });
  }

  @Action(TrainingAction.Stop)
  stop(ctx: StateContext<TrainingStateModel>, action: TrainingAction.Stop) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      activeTraining: null
    });
  }

  @Selector()
  static getAvailableExercises(state: TrainingStateModel) {
    return state.availableExercises;
  }

  @Selector()
  static getFinishedExercises(state: TrainingStateModel) {
    return state.finishedExercises;
  }

  @Selector()
  static getActiveTraining(state: TrainingStateModel) {
    return state.activeTraining;
  }

  @Selector()
  static getIsTraining(state: TrainingStateModel) {
    return state.activeTraining != null;
  }
}
