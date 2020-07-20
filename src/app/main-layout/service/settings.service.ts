import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceType } from './../../core/enum/enum';
import { Injectable, Inject } from '@angular/core';
import { IApiService, API_SERVICE } from 'src/app/shared/service/api.service';

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

@Injectable()
export class SettingsService {

  private settingsSubject: BehaviorSubject<ISettings|null> = new BehaviorSubject<ISettings|null>(null);

  constructor(@Inject(API_SERVICE) private api: IApiService<ServiceType>) { }

  public get tasks$(): Observable<ISettings|null> {
    return this.settingsSubject.asObservable();
  }

  public get tasks(): ISettings|null {
    return this.settingsSubject.getValue();
  }
}
