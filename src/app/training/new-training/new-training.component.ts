import { Component, OnInit } from '@angular/core';
import { NgForm }            from '@angular/forms';
import { Select }            from '@ngxs/store';

import { Observable } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise }        from '../exercise.model';
import { TrainingState }   from '../training.state';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  @Select(TrainingState.getIsTraining)         getIsTraining$: Observable<boolean>;
  @Select(TrainingState.getAvailableExercises) getAvailableExercises$: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.isLoading$ = this.getIsTraining$;
    this.exercises$ = this.getAvailableExercises$;
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
