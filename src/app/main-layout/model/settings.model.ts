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
