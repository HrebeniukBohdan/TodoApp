import { ISettings } from '../../model/settings.model';
import { IDisplayParameter } from '../../model/common.model';

export interface SettingsStateModel {
  modes: IDisplayParameter[];
  parameters: IDisplayParameter[];
  settings: ISettings | null;
}
