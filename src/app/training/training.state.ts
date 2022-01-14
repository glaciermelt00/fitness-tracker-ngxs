
import { Injectable }                                  from '@angular/core';
import { Emittable, Emitter, EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { State, StateContext, Selector }               from '@ngxs/store';

import { Exercise } from './exercise.model';

//--[ Constant ]--------------------------
const STATE_NAME = 'training';

const STATE_DEFAULTS_VALUES: TrainingStateModel = {
  availableExercises: [],
  finishedExercises:  [],
  activeTraining:     null
}

export interface TrainingStateModel {
  availableExercises: Exercise[];
  finishedExercises:  Exercise[];
  activeTraining:     Exercise
}

@State<TrainingStateModel>({
  name:     STATE_NAME,
  defaults: STATE_DEFAULTS_VALUES
})
@Injectable()
export class TrainingState {

  //--[ Emitter ]--------------------------
  @Emitter(TrainingState.setAvailable) static actSetAvailable: Emittable<Exercise[]>;
  @Emitter(TrainingState.setFinished)  static actSetFinished:  Emittable<Exercise[]>;
  @Emitter(TrainingState.start)        static actStart:        Emittable<string>;
  @Emitter(TrainingState.stop)         static actStop:         Emittable<void>;

  //--[ Receiver ]--------------------------
  @Receiver()
  static setAvailable(
    ctx:    StateContext<TrainingStateModel>,
    action: EmitterAction<Exercise[]>
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      availableExercises: action.payload
    });
  }

  @Receiver()
  static setFinished(
    ctx:    StateContext<TrainingStateModel>,
    action: EmitterAction<Exercise[]>
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      finishedExercises: action.payload
    });
  }

  @Receiver()
  static start(
    ctx:    StateContext<TrainingStateModel>,
    action: EmitterAction<string>
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
    });
  }

  @Receiver()
  static stop(
    ctx:    StateContext<TrainingStateModel>,
    action: EmitterAction<void>
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      activeTraining: null
    });
  }

  //--[ Selector ]--------------------------
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
