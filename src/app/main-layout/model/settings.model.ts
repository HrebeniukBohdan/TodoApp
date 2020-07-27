import { IDisplayParameter } from './common.model';

export type ModeType = 'mode0'|'mode1'|'mode2'|'mode3';

export interface IParams {
  param0: boolean;
  param1: boolean;
  param2: boolean;
  param3: boolean;
  param4: boolean;
  param5: boolean;
}

export interface ISettings {
  name: string;
  surname: string;
  mode: ModeType;
  params: IParams;
}


export const SETTINGS_MODES: IDisplayParameter[] = [
  { name: 'mode #1', key: 'mode0' },
  { name: 'mode #2', key: 'mode1' },
  { name: 'mode #3', key: 'mode2' },
  { name: 'mode #4', key: 'mode3' }
];

export const SETTINGS_PARAMS: IDisplayParameter[] = [
  { name: 'parameter #1', key: 'param0' },
  { name: 'parameter #2', key: 'param1' },
  { name: 'parameter #3', key: 'param2' },
  { name: 'parameter #4', key: 'param3' },
  { name: 'parameter #5', key: 'param4' },
  { name: 'parameter #6', key: 'param5' }
];
