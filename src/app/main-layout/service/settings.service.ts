import { ISettings } from '@main-layout/model/settings.model';
import { Observable } from 'rxjs';
import { ServiceType } from '@core/enum';
import { Injectable, Inject } from '@angular/core';
import { IApiService, API_SERVICE } from '@shared/service/api.service';

@Injectable()
export class SettingsService {

  constructor(@Inject(API_SERVICE) private api: IApiService<ServiceType>) { }

  public fetchSettings(): Observable<ISettings> {
    return this.api.get<ISettings>(ServiceType.PROFILE, 'settings');
  }

  public changeSettings(newSettings: ISettings): Observable<ISettings> {
    return this.api.patch<ISettings>(ServiceType.PROFILE, 'settings', newSettings);
  }
}
