import { Injectable }                            from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { tap, finalize } from 'rxjs/operators';

import { Exercise }        from './exercise.model';
import { TrainingAction } from './training.actions';
import { TrainingService } from './training.service';

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
  },
})
@Injectable()
export class TrainingState {
  constructor(private trainingService: TrainingService) {}

  @Action(TrainingAction.SetAvailable)
  getHeroes(ctx: StateContext<TrainingStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      availableExercises: state.availableExercises
    });
  }

  @Action(HeroAction.Get)
  getHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Get) {
    return this.heroService.getHero(action.id).pipe(
      tap((data) => {
        ctx.patchState({ selectedHero: data });
      })
    );
  }

  @Action(HeroAction.Add)
  addHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Add) {
    return this.heroService.addHero(action.hero).pipe(
      finalize(() => {
        ctx.dispatch(new HeroAction.GetAll());
      })
    );
  }

  @Action(HeroAction.Delete)
  deleteHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Delete) {
    return this.heroService.deleteHero(action.hero).pipe(
      finalize(() => {
        ctx.dispatch(new HeroAction.GetAll());
      })
    );
  }

  @Action(HeroAction.Update)
  updateHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Update) {
    return this.heroService.updateHero(action.hero).pipe(
      finalize(() => {
        ctx.patchState({
          selectedHero: action.hero,
        });
      })
    );
  }

  @Selector()
  static heroes(state: HeroStateModel) {
    return state.heroes;
  }

  @Selector()
  static selectedHero(state: HeroStateModel) {
    return state.selectedHero;
  }
}
