import { ISettings } from '@main-layout/model/settings.model';
import { SettingsStore } from '../store/settings.store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SettingsService } from '@main-layout/service/settings.service';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { SettingsStateModel } from '../model/settings.model';

@Injectable()
export class SettingsAction {
  constructor(
    private router: Router,
    private store: SettingsStore,
    private api: SettingsService
  ) {}

  load(): Observable<SettingsStateModel> {
    const currentState = this.store.getValue();
    return currentState.settings ?
      of(currentState)
      :
      this.api.fetchSettings().pipe(
        tap(settings => this.store.update(
          state => ({ ...state, settings })
        )),
        map(settings => ({ ...currentState, settings }))
      );
  }

  save(changedSettings: ISettings): Observable<boolean> {
    return this.api.changeSettings(
      changedSettings
    ).pipe(
      tap(settings => this.store.update(
        state => ({ ...state, settings })
      )),
      mergeMap(() => this.router.navigateByUrl('/'))
    );
  }
}
