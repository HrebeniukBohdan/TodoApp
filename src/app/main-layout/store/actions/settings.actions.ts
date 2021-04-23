import { ISettings } from '@main-layout/model/settings.model';

export enum SettingsActionTypes {
  Load = '[Settings] Load Settings',
  Save = '[Settings] Save Settings',
  Failure = '[Settings] Settings Failure'
}

export namespace SettingsActions {
  export class Load {
    static readonly type: SettingsActionTypes = SettingsActionTypes.Load;
  }

  export class Save {
    static readonly type: SettingsActionTypes = SettingsActionTypes.Save;
    constructor(public payload: { changedSettings: ISettings }) { }
  }

  export class Failure {
    static readonly type: SettingsActionTypes = SettingsActionTypes.Failure;
    constructor(public payload: { error: any }) { }
  }
}
