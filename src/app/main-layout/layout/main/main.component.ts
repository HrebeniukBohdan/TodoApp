import { MainState } from '@main-layout/store/states/main.state';
import { Component } from '@angular/core';
import { MenuRouteData } from '@main-layout/model/menu.model';
import { Select, Store } from '@ngxs/store';
import { AuthActions  } from '@auth-layout/store/actions';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Select(MainState) state$: Observable<MenuRouteData[]>;

  constructor(private readonly store: Store) { }

  public logOut(): void {
    this.store.dispatch(new AuthActions.SignOut());
  }

}
