import { Component, OnInit } from '@angular/core';
import { NgForm }            from '@angular/forms';
import { Select }            from '@ngxs/store';

import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIState }     from '../../shared/ui.state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading$: Observable<boolean>;

  @Select(UIState.getIsLoading) getIsLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.getIsLoading$;
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email:    form.value.email,
      password: form.value.password
    });
  }
}
