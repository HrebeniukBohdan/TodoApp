import { SaveSettings } from './../actions/settings.actions';
import { Router } from '@angular/router';
import { SettingsService } from '@main-layout/service/settings.service';
import {
  SettingsActionTypes,
  LoadSettingsSuccess,
  LoadSettingsFailure,
  SaveSettingsSuccess,
  SaveSettingsFailure
} from '@main-layout/store/actions/settings.actions';
import { map, catchError, switchMap, first, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';

@Injectable()
export class SettingsEffects {

  @Effect()
  loadSettings$: Observable<LoadSettingsSuccess | LoadSettingsFailure> = this.actions$.pipe(
    ofType(SettingsActionTypes.LoadSettings),
    first(),
    switchMap(() => this.settingsApi.fetchSettings().pipe(
      map(settings => new LoadSettingsSuccess({ settings })),
      catchError(error => of(new LoadSettingsFailure({ error }))))
    )
  );

  @Effect()
  saveSettings$: Observable<SaveSettingsSuccess | SaveSettingsFailure> = this.actions$.pipe(
    ofType(SettingsActionTypes.SaveSettings),
    switchMap(({ payload }: SaveSettings) => this.settingsApi.changeSettings(payload.changedSettings).pipe(
      map(updatedSettings => new SaveSettingsSuccess({ updatedSettings })),
      tap(() => this.router.navigateByUrl('/')),
      catchError(error => of(new SaveSettingsFailure({ error }))))
    )
  );

  @Effect()
  goBackSettings$: Observable<never>  = this.actions$.pipe(
    ofType(SettingsActionTypes.GoBackSettings),
    tap(() => this.router.navigateByUrl('/'))
  );

  constructor(
    private actions$: Actions,
    private settingsApi: SettingsService,
    private router: Router
  ) {}

}
