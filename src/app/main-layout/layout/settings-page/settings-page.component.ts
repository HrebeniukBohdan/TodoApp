import { RouterAction } from '@core/router/router.action';
import { dispatch } from '@core/utils';
import { SettingsAction } from '@main-layout/state/action/settings.action';
import { ISettings } from '@main-layout/model/settings.model';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SettingsQuery } from '@main-layout/state/query/settings.query';
import { SettingsStateModel } from '@main-layout/state/model/settings.model';

@Component({
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent implements OnInit {

  state$: Observable<SettingsStateModel> = this.query.state$;

  constructor(
    private readonly routerAction: RouterAction,
    private readonly action: SettingsAction,
    private readonly query: SettingsQuery,
  ) { }

  ngOnInit(): void {
    dispatch(this.action.load());
  }

  public save(changedSettings: ISettings): void {
    dispatch(this.action.save(changedSettings));
  }

  public goBack(): void {
    dispatch(this.routerAction.navigate('/'));
  }
}
