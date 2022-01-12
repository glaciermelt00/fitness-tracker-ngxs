import {
  Component,
  EventEmitter,
  OnInit,
  Output
}                 from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { AuthState }   from 'src/app/auth/auth.state';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  @Select(AuthState.getIsAuth) getIsAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuth$ = this.getIsAuth$;
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
