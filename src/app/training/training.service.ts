import { Injectable }       from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Select }           from '@ngxs/store';

import { Observable, Subscription } from 'rxjs';
import { take }                     from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Exercise }       from './exercise.model';
import { UIService }      from '../shared/ui.service';
import { UIState }        from '../shared/ui.state';
import { TrainingState } from './training.state';

@Injectable()
export class TrainingService {
  @Select(TrainingState.getActiveTraining) activeTraining$: Observable<Exercise>;

  private fbSubs: Subscription[] = [];

  constructor(
    private db:        AngularFirestore,
    private uiService: UIService
  ) {}

  fetchAvailableExercises() {
    UIState.actStartLoading.emit();
    this.fbSubs.push(this.db
    .collection('availableExercises')
    .snapshotChanges()
    .map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data() as Exercise
        };
      });
    })
    .subscribe((exercises: Exercise[]) => {
      UIState.actStopLoading.emit();
      TrainingState.actSetAvailable.emit(exercises);
    }, error => {
      UIState.actStopLoading.emit();
      this.uiService.showSnackbar(
        'Fetching exercises failed, please try again later',
        null,
        3000
      );
    }));
  }

  startExercise(selectedId: string) {
    TrainingState.actStart.emit(selectedId);
  }

  completeExercise() {
    this.activeTraining$.pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date:  new Date(),
        state: 'completed'
      });
      TrainingState.actStop.emit();
    });
  }

  cancelExercise(progress: number) {
    this.activeTraining$.pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date:     new Date(),
        state:    'cancelled'
      });
      TrainingState.actStop.emit();
    });
  }

  fetchCompleteOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        TrainingState.actSetFinished.emit(exercises);
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
