import { SettingsStore } from './../store/settings.store';
import { SettingsStateModel } from '../model/settings.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';

@Injectable()
export class SettingsQuery extends Query<SettingsStateModel> {
  state$: Observable<SettingsStateModel> = this.select();

  constructor(protected store: SettingsStore) {
    super(store);
  }
}
