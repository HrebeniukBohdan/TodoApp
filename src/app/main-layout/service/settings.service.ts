import { ISettings } from '@main-layout/model/settings.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ServiceType } from '@core/enum';
import { Injectable, Inject } from '@angular/core';
import { IApiService, API_SERVICE } from '@shared/service/api.service';

@Injectable()
export class SettingsService {

  private settingsSubject: BehaviorSubject<ISettings|null> = new BehaviorSubject<ISettings|null>(null);

  constructor(@Inject(API_SERVICE) private api: IApiService<ServiceType>) { }

  public get settings$(): Observable<ISettings|null> {
    return this.settingsSubject.asObservable();
  }

  public get settings(): ISettings|null {
    return this.settingsSubject.getValue();
  }

  public fetchSettings(): Observable<ISettings> {
    return this.settings ? of(this.settings) :
    this.api.get<ISettings>(ServiceType.PROFILE, 'settings').pipe(
      tap(settings => this.settingsSubject.next(settings))
    );
  }

  public changeSettings(newSettings: ISettings): Observable<ISettings> {
    return this.api.patch<ISettings>(ServiceType.PROFILE, 'settings', newSettings).pipe(
      tap(() => this.settingsSubject.next(newSettings))
    );
  }
}
