import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { AppConfig } from './app-config.service';
import { SpinnerService } from './spinner.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let controller: HttpTestingController;
  let spinnerServiceSpyObj: jasmine.SpyObj<SpinnerService>;
  let statusSpy: jasmine.Spy<jasmine.Func>;
  let statusSpy$: jasmine.Spy<jasmine.Func>;
  let captureSpy: jasmine.Spy<jasmine.Func>;
  let releaseSpy: jasmine.Spy<jasmine.Func>;
  let appConfigServiceSpyObj: jasmine.SpyObj<AppConfig>;
  let getConfigSpy: jasmine.Spy<jasmine.Func>;
  let loadSpy: jasmine.Spy<jasmine.Func>;

  beforeEach(() => {
    captureSpy = jasmine.createSpy('capture');
    releaseSpy = jasmine.createSpy('release');
    statusSpy$ = jasmine.createSpy('status$');
    statusSpy = jasmine.createSpy('status');
    const spinnerSpyObj = jasmine.createSpyObj('SpinnerService', {
      capture: captureSpy,
      release: releaseSpy,
    }, {
      status$: statusSpy$,
      status: statusSpy,
    });

    getConfigSpy = jasmine.createSpy('getConfig');
    loadSpy = jasmine.createSpy('load');
    const appConfigSpyObj = jasmine.createSpyObj('AppConfig', {
      getConfig: getConfigSpy,
      load: loadSpy,
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        { provide: AppConfig, useValue: appConfigSpyObj },
        { provide: SpinnerService, useValue: spinnerSpyObj },
      ]
    });

    service = TestBed.inject(ApiService);
    controller = TestBed.inject(HttpTestingController);
    spinnerServiceSpyObj = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;
    appConfigServiceSpyObj = TestBed.inject(AppConfig) as jasmine.SpyObj<AppConfig>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('prepareFullUrl', () => {
    it('should error with no config for ApiService', () => {
      expect(function() {
        service.request('GET', 'test', 'post/1')
      }).toThrowError('There is no a config for ApiService');
    });

    it('should error with no remote service with the type "test"', () => {
      expect(function() {
        appConfigServiceSpyObj.getConfig.and.returnValue({
          serviceEndpoints: {}
        })
        service.request('GET', 'test', 'post/1')
      }).toThrowError('There is no such a remote service with the type "test"');
    });
  });

  describe('request', () => {
    const configBaseUrl = 'https://test.com/api';
    const featureUrl = 'post/1';
    const url = `${configBaseUrl}/${featureUrl}`;

    it('should be equal to url', (done) => {
      appConfigServiceSpyObj.getConfig.and.returnValue({
        serviceEndpoints: {
          test: configBaseUrl
        }
      });

      service.request(
        'GET', 
        'test', 
        featureUrl, 
        false
      ).subscribe();
      const request = controller.expectOne(req => req.method === 'GET');
      request.flush({});

      setTimeout(function() {
        expect(request.request.method).toEqual('GET');
        expect(request.request.url).toEqual(url);
        done();
      }, 10);
    });

    it('should have called capture() and release()', (done) => {
      appConfigServiceSpyObj.getConfig.and.returnValue({
        serviceEndpoints: {
          test: configBaseUrl
        }
      });

      service.request(
        'GET', 
        'test', 
        featureUrl
      ).subscribe();
      const request = controller.expectOne(req => req.method === 'GET');
      request.flush({});

      setTimeout(function() {
        expect(spinnerServiceSpyObj.capture).toHaveBeenCalled();
        expect(spinnerServiceSpyObj.release).toHaveBeenCalled();
        done();
      }, 10);
    });

    it('should have called get() and return responce', (done) => {
      const testResponse = { testValue: 'some test value' };
      appConfigServiceSpyObj.getConfig.and.returnValue({
        serviceEndpoints: {
          test: configBaseUrl
        }
      });

      service.get('test', featureUrl).subscribe(value => {
        expect(value).toEqual(testResponse);
        done();
      });

      const request = controller.expectOne(url);
      request.flush(testResponse);
      controller.verify();
    });

    function callApiMethod(method: 'post'|'patch'|'put'|'delete', done: DoneFn) {
      const testResponse = { testValue: 'some test value' };
      appConfigServiceSpyObj.getConfig.and.returnValue({
        serviceEndpoints: {
          test: configBaseUrl
        }
      });

      const apiMethod = service[method];
      const bindedApiMethod = apiMethod.bind(service) as typeof apiMethod;
      bindedApiMethod('test', featureUrl, {
        name: 'some name',
        age: 21,
        adress: 'street Avenue, house 9',
      }, true, { headers: { Authorization: 'Bearer a445bcee345cd537c'} }).subscribe((value) => {
        expect(value).toEqual(testResponse);
        done();
      });

      const request = controller.expectOne(url);
      request.flush(testResponse);
      controller.verify();
    }

    it('should have called post() and return responce', (done) => {
      callApiMethod('post', done);
    });

    it('should have called patch() and return responce', (done) => {
      callApiMethod('patch', done);
    });

    it('should have called put() and return responce', (done) => {
      callApiMethod('put', done);
    });

    it('should have called delete() and return responce', (done) => {
      callApiMethod('delete', done);
    });
  });
});
