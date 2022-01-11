import { Component, OnInit } from '@angular/core';
import { MatDialog }         from '@angular/material/dialog';
import { Select, Store }     from '@ngxs/store';

import { Observable } from 'rxjs';
import { take }       from 'rxjs/operators';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService }       from '../training.service';
import { TrainingState }         from '../training.state';
import { Exercise }              from '../exercise.model';
// import * as fromTraining         from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  @Select(TrainingState.getActiveTraining) activeTraining$: Observable<Exercise>;

  constructor(
    private dialog:          MatDialog,
    private trainingService: TrainingService,
    private store:           Store
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.activeTraining$.pipe(take(1)).subscribe(ex => {
      const step_ms = ex.duration / 100 * 1000;
      this.timer = window.setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step_ms)
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
