import { Injectable }       from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Select, Store }    from '@ngxs/store';

import { Observable, Subscription } from 'rxjs';
import { take }                  from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Exercise }       from './exercise.model';
import { UIService }      from '../shared/ui.service';
import { UIAction }       from '../shared/ui.actions';
import { TrainingAction } from './training.actions';
import { TrainingState }  from './training.state';

@Injectable()
export class TrainingService {
  @Select(TrainingState.getActiveTraining) activeTraining$: Observable<Exercise>;

  private fbSubs:             Subscription[] = [];

  constructor(
    private db:        AngularFirestore,
    private uiService: UIService,
    private store:     Store
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UIAction.StartLoading);
    this.fbSubs.push(this.db
    .collection('availableExercises')
    .snapshotChanges()
    .map(docArray => {
      // throw(new Error());
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data() as Exercise
        };
      });
    })
    .subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new UIAction.StopLoading);
      this.store.dispatch(new TrainingAction.SetAvailable(exercises));
    }, error => {
      this.store.dispatch(new UIAction.StopLoading);
      this.uiService.showSnackbar(
        'Fetching exercises failed, please try again later',
        null,
        3000
      );
    }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new TrainingAction.Start(selectedId));
  }

  completeExercise() {
    this.activeTraining$.pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date:  new Date(),
        state: 'completed'
      });
      this.store.dispatch(new TrainingAction.Stop());
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
      this.store.dispatch(new TrainingAction.Stop());
    });
  }

  fetchCompleteOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new TrainingAction.SetFinished(exercises));
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
