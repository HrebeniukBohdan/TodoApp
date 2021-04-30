import { MainQuery } from '@main-layout/state/query/main.query';
import { dispatch } from '@core/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuRouteData } from '@main-layout/model/menu.model';
import { Observable } from 'rxjs';
import { AuthAction } from '@auth-layout/state/auth.action';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  state$: Observable<MenuRouteData[]> = this.query.select();

  constructor(
    private readonly authAction: AuthAction,
    private readonly query: MainQuery
  ) { }

  public logOut(): void {
    dispatch(this.authAction.signOut());
  }

}
