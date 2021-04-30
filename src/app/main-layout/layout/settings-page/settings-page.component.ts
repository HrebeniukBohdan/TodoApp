import { dispatch } from '@core/utils';
import { SettingsAction } from '@main-layout/state/action/settings.action';
import { Router } from '@angular/router';
import { SettingsStateModel } from '@main-layout/store/states/settings.state';
import { ISettings } from '@main-layout/model/settings.model';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SettingsQuery } from '@main-layout/state/query/settings.query';

@Component({
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent implements OnInit {

  state$: Observable<SettingsStateModel> = this.query.state$;

  constructor(
    private readonly router: Router,
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
    this.router.navigateByUrl('/');
  }
}
