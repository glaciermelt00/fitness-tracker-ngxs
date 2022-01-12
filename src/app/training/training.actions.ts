import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS  = '[Training] Set Finished Trainings';
export const START_TRAINING          = '[Training] Start Training';
export const STOP_TRAINING           = '[Training] Stop Training';

export namespace TrainingAction {
  export class SetAvailable {
    static readonly type = SET_AVAILABLE_TRAININGS;

    constructor(public payload: Exercise[]) {}
  }

  export class SetFinished {
    static readonly type = SET_FINISHED_TRAININGS;

    constructor(public payload: Exercise[]) {}
  }

  export class Start {
    static readonly type = START_TRAINING;

    constructor(public payload: string) {}
  }

  export class Stop {
    static readonly type = STOP_TRAINING;
  }
}
