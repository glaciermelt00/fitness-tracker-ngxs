import { Component, OnInit } from '@angular/core';
import { NgForm }            from '@angular/forms';
import { Select, Store }     from '@ngxs/store';

import { Observable } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise }        from '../exercise.model';
// import * as fromTraining   from '../training.reducer';
// import * as fromRoot       from '../../app.reducer';
import { TrainingState }   from '../training.state';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  @Select(TrainingState.getActiveTraining) activeTraining$: Observable<Exercise>;

  constructor(
    private trainingService: TrainingService,
    private store:           Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
