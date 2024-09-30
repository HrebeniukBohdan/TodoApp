import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { API_SERVICE, IApiService } from '@shared/service/api.service';
import { ServiceType } from '@core/enum';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, { provide: API_SERVICE, useValue: {} as IApiService<ServiceType> }]
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
