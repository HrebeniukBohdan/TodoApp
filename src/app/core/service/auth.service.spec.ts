import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { API_SERVICE, IApiService } from '@shared/service/api.service';
import { ServiceType } from '@core/enum';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: API_SERVICE, useValue: {} as IApiService<ServiceType> }]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
