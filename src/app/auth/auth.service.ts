import { Injectable }      from '@angular/core';
import { Router }          from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store }           from '@ngxs/store';

import { AuthData }        from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService }       from '../shared/ui.service';
import { UIAction }        from '../shared/ui.actions';
import { AuthState }       from './auth.state';

@Injectable()
export class AuthService {

  constructor(
    private router:          Router,
    private afAuth:          AngularFireAuth,
    private trainingService: TrainingService,
    private uiService:       UIService,
    private store:           Store
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        AuthState.actSetAuthenticated.emit();
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        AuthState.actSetUnauthenticated.emit();
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UIAction.StartLoading);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UIAction.StopLoading);
      })
      .catch(error => {
        this.store.dispatch(new UIAction.StopLoading);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UIAction.StartLoading);
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.store.dispatch(new UIAction.StopLoading);
    })
    .catch(error => {
      this.store.dispatch(new UIAction.StopLoading);
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  logout() {
    this.afAuth.signOut();
  }
}
