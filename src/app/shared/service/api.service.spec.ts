import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { AppConfig } from './app-config.service';
import { SpinnerService } from './spinner.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [
        ApiService,
        { provide: AppConfig, useValue: {} },
        { provide: HttpClient, useValue: {} },
        { provide: SpinnerService, useValue: {} },
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
