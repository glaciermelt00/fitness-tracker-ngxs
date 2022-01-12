import { Component, OnInit } from '@angular/core';
import { Select }            from '@ngxs/store';

import { Observable } from 'rxjs';

import { TrainingState } from './training.state';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  @Select(TrainingState.getIsTraining) getIsTraining$: Observable<boolean>;

  ngOnInit(): void {
    this.ongoingTraining$ = this.getIsTraining$;
  }
}
