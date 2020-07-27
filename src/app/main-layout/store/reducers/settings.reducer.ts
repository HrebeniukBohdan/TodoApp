import { SETTINGS_MODES, SETTINGS_PARAMS } from './../../model/settings.model';
import { LoadSettingsSuccess, SaveSettingsSuccess } from './../actions/settings.actions';
import { SettingsActionTypes } from '@main-layout/store/actions/settings.actions';
import { Action } from '@ngrx/store';
import { ISettings } from '@main-layout/model/settings.model';
import { IDisplayParameter } from '@main-layout/model/common.model';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
  modes: IDisplayParameter[];
  parameters: IDisplayParameter[];
  settings: ISettings | null;
}

export const initialState: SettingsState = {
  modes: SETTINGS_MODES,
  parameters: SETTINGS_PARAMS,
  settings: null
};

export function reducer(state = initialState, action: Action): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.LoadSettingsSuccess:
      return { ...state, ...(action as LoadSettingsSuccess).payload };

    case SettingsActionTypes.SaveSettingsSuccess:
      return { ...state, settings: (action as SaveSettingsSuccess).payload.updatedSettings };

    default:
      return state;
  }
}
