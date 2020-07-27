import { Action } from '@ngrx/store';
import { ISettings } from '@main-layout/model/settings.model';

export enum SettingsActionTypes {
  LoadSettings = '[Settings] Load Settings',
  LoadSettingsSuccess = '[Settings] Load Settings Success',
  LoadSettingsFailure = '[Settings] Load Settings Failure',
  SaveSettings = '[Settings] Save Settings',
  SaveSettingsSuccess = '[Settings] Save Settings Success',
  SaveSettingsFailure = '[Settings] Save Settings Failure',
  GoBackSettings = '[Settings] Go Back Settings',
}

export class LoadSettings implements Action {
  readonly type: SettingsActionTypes = SettingsActionTypes.LoadSettings;
}

export class LoadSettingsSuccess implements Action {
  readonly type: SettingsActionTypes = SettingsActionTypes.LoadSettingsSuccess;
  constructor(public payload: { settings: ISettings }) { }
}

export class LoadSettingsFailure implements Action {
  readonly type: SettingsActionTypes = SettingsActionTypes.LoadSettingsFailure;
  constructor(public payload: { error: any }) { }
}

export class SaveSettings implements Action {
  readonly type: SettingsActionTypes = SettingsActionTypes.SaveSettings;
  constructor(public payload: { changedSettings: ISettings }) { }
}

export class SaveSettingsSuccess implements Action {
  readonly type: SettingsActionTypes = SettingsActionTypes.SaveSettingsSuccess;
  constructor(public payload: { updatedSettings: ISettings }) { }
}

export class SaveSettingsFailure implements Action {
  readonly type: SettingsActionTypes = SettingsActionTypes.SaveSettingsFailure;
  constructor(public payload: { error: any }) { }
}

export class GoBackSettings implements Action {
  readonly type: SettingsActionTypes = SettingsActionTypes.GoBackSettings;
}

export type SettingsActions = LoadSettings |
                              LoadSettingsSuccess |
                              LoadSettingsFailure |
                              SaveSettings |
                              SaveSettingsSuccess |
                              SaveSettingsFailure |
                              GoBackSettings;

