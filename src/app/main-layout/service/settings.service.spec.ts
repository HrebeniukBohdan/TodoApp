import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { API_SERVICE, IApiService } from '@shared/service/api.service';
import { ServiceType } from '@core/enum';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService, { provide: API_SERVICE, useValue: {} as IApiService<ServiceType> }]
    });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
