import { SETTINGS_MODES, SETTINGS_PARAMS } from '../../model/settings.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { SettingsStateModel } from '../model/settings.model';

const initialState: SettingsStateModel = {
  modes: SETTINGS_MODES,
  parameters: SETTINGS_PARAMS,
  settings: null
};

@StoreConfig({ name: 'settings' })
@Injectable()
export class SettingsStore extends Store<SettingsStateModel> {
  constructor() {
    super(initialState);
  }
}
