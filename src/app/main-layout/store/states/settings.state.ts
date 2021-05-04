import { delay, map, mergeMap } from 'rxjs/operators';
import { SETTINGS_MODES, SETTINGS_PARAMS } from '@main-layout/model/settings.model';
import { ISettings } from '@main-layout/model/settings.model';
import { IDisplayParameter } from '@main-layout/model/common.model';
import { SettingsService } from '@main-layout/service/settings.service';
import { SettingsActions } from '../actions/settings.actions';
import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';

export interface SettingsStateModel {
  modes: IDisplayParameter[];
  parameters: IDisplayParameter[];
  settings: ISettings | null;
}

@State<SettingsStateModel>({
  name: 'settingsSubFeature',
  defaults: {
    modes: SETTINGS_MODES,
    parameters: SETTINGS_PARAMS,
    settings: null
  }
})
@Injectable()
export class SettingsState {
  constructor(
    private settingsApi: SettingsService
  ) {}

  @Action(SettingsActions.Load)
  load(ctx: StateContext<SettingsStateModel>): Observable<SettingsStateModel> {
    const state = ctx.getState();
    return state.settings ?
      of(ctx.setState(state))
      :
      this.settingsApi.fetchSettings().pipe(
        map(settings => ctx.patchState({ settings }))
      );
  }

  @Action(SettingsActions.Save)
  save(ctx: StateContext<SettingsStateModel>, { payload }: SettingsActions.Save): Observable<unknown> {
    return this.settingsApi.changeSettings(
      payload.changedSettings
    ).pipe(
      map(settings => ctx.patchState({ settings })),
      mergeMap(() => ctx.dispatch(new Navigate(['/'])))
    );
  }
}
