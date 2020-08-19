import { Action } from '@ngrx/store';

export enum MainActionTypes {
  GoBack = '[Main] Go Back',
}

export class GoBack implements Action {
  readonly type: MainActionTypes = MainActionTypes.GoBack;
}

export type MainActions = GoBack;
