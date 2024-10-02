import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [SpinnerService]});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable with "true" value', (done) => {
    service.capture();
    service.status$.subscribe(result => {
      expect(result).toBeTrue();
      expect(service.status).toBeTrue();
      done();
    });
  });

  it('should return an Observable with "true" value after 2 captures and 1 release', (done) => {
    expect(service.status).toBeFalse();
    service.capture();
    service.capture();
    service.release();
    service.status$.subscribe(result => {
      expect(result).toBeTrue();
      expect(service.status).toBeTrue();
      done();
    });
  });

  it('should return an Observable with "false" value after 2 captures and 2 releases', (done) => {
    expect(service.status).toBeFalse();
    service.capture();
    service.capture();
    service.release();
    service.release();
    service.status$.subscribe(result => {
      expect(result).toBeFalse();
      expect(service.status).toBeFalse();
      done();
    });
  });
});
