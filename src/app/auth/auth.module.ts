import { NgModule }            from "@angular/core";
import { CommonModule }        from "@angular/common";
import { FormsModule }         from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule }    from '@angular/flex-layout';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent }  from './login/login.component';
import { MaterialModule }  from '../material.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class AuthModule { }