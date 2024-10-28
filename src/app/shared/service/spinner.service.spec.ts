import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let spectator: SpectatorService<SpinnerService>;
  let service: SpinnerService;

  const createService = createServiceFactory({
    service: SpinnerService,
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable with "true" value', (done) => {
    service.capture();
    service.status$.subscribe(result => {
      expect(result).toBe(true);
      expect(service.status).toBe(true);
      done();
    });
  });

  it('should return an Observable with "true" value after 2 captures and 1 release', (done) => {
    expect(service.status).toBe(false);
    service.capture();
    service.capture();
    service.release();
    service.status$.subscribe(result => {
      expect(result).toBe(true);
      expect(service.status).toBe(true);
      done();
    });
  });

  it('should return an Observable with "false" value after 2 captures and 2 releases', (done) => {
    expect(service.status).toBe(false);
    service.capture();
    service.capture();
    service.release();
    service.release();
    service.status$.subscribe(result => {
      expect(result).toBe(false);
      expect(service.status).toBe(false);
      done();
    });
  });
});
