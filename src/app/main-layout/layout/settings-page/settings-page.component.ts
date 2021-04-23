import { SettingsState, SettingsStateModel } from '@main-layout/store/states/settings.state';
import { ISettings } from '@main-layout/model/settings.model';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SettingsActions } from '@main-layout/store/actions/settings.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent implements OnInit {

  @Select(SettingsState) state$: Observable<SettingsStateModel>;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new SettingsActions.Load());
  }

  public save(changedSettings: ISettings): void {
    this.store.dispatch(new SettingsActions.Save({ changedSettings }));
  }

  public goBack(): void {
    this.store.dispatch(new Navigate(['/']));
  }
}
