import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppConfig, resolveAppConfigFactory } from './app-config.service';
import { environment } from '@environments/environment';

describe('AppConfigService', () => {
  let service: AppConfig;
  let controller: HttpTestingController
  const jsonFile = `assets/configs/config.${environment.name}.json`;
  const config = {
    url: 'http://some-domain.com/api',
    timeout: 200,
    settings: {
      name: 'someName',
      requestLimit: 30
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [AppConfig] });
    service = TestBed.inject(AppConfig);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be undefined', () => {
    expect(service.getConfig()).toBeUndefined();
  });

  it('should be loaded and equal config', (done) => {
    service.load().then(() => {
      expect(service.getConfig()).toEqual(config);
      done();
    })
    
    const request = controller.expectOne(jsonFile);
    request.flush(config)
  });

  it('should be loaded with the factory and equal config', (done) => {
    resolveAppConfigFactory(service)();
    
    const request = controller.expectOne(jsonFile);
    request.flush(config)
    controller.verify();

    setTimeout(function() {
      expect(service.getConfig()).toEqual(config);
      done();
    }, 100);
  });

  it('should be loaded with error', (done) => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ErrorEvent('API error');

    service.load().catch((value: string) => {
      expect(service.getConfig()).toBeUndefined();
      expect(value).toContain(`Could not load file '${jsonFile}': `);
      done();
    })
    
    const request = controller.expectOne(jsonFile);
    request.error(errorEvent, { status, statusText });
  });
});
