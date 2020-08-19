import { GoBack } from './../../store/actions/main.actions';
import { SaveSettings } from './../../store/actions/settings.actions';
import { ISettings } from '@main-layout/model/settings.model';
import { SettingsState } from './../../store/reducers/settings.reducer';
import { Observable } from 'rxjs';
import { selectSettingsState } from '@main-layout/store/selectors/settings.selectors';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadSettings } from '@main-layout/store/actions/settings.actions';

@Component({
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent implements OnInit {

  public state$: Observable<SettingsState> = this.store.select(selectSettingsState);

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadSettings());
  }

  public save(changedSettings: ISettings): void {
    this.store.dispatch(new SaveSettings({ changedSettings }));
  }

  public goBack(): void {
    this.store.dispatch(new GoBack());
  }
}
