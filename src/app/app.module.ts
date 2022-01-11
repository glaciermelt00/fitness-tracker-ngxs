import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule }       from '@angular/fire/compat';
import { AngularFirestoreModule }  from '@angular/fire/compat/firestore';
import { StoreModule }             from '@ngrx/store';
import { NgxsModule }              from '@ngxs/store';

import { AppComponent }         from './app.component';
import { WelcomeComponent }     from './welcome/welcome.component';
import { AppRoutingModule }     from './app-routing.module';
import { HeaderComponent }      from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService }          from './auth/auth.service';
import { TrainingService }      from './training/training.service';
import { environment }          from '../environments/environment';
import { UIService }            from './shared/ui.service';
import { AuthModule }           from './auth/auth.module';
import { SharedModule }         from './shared/shared.module';
import { reducers }             from './app.reducer';
import { TrainingState }        from './training/training.state';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    NgxsModule.forRoot([TrainingState])
  ],
  providers: [
    AuthService,
    TrainingService,
    UIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
