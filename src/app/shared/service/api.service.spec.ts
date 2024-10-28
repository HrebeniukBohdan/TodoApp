import { createHttpFactory, SpectatorHttp, SpyObject } from '@ngneat/spectator/jest';
import { ApiService } from './api.service';
import { AppConfig } from './app-config.service';
import { SpinnerService } from './spinner.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let spectator: SpectatorHttp<ApiService>;
  let controller: HttpTestingController;
  let spinnerServiceSpy: SpyObject<SpinnerService>;
  let appConfigServiceSpy: SpyObject<AppConfig>;

  const createService = createHttpFactory({
    service: ApiService,
    mocks: [AppConfig, SpinnerService],
  });

  beforeEach(() => {
    spectator = createService();
    controller = spectator.controller;
    spinnerServiceSpy = spectator.inject(SpinnerService);
    appConfigServiceSpy = spectator.inject(AppConfig);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('prepareFullUrl', () => {
    it('should error with no config for ApiService', () => {
      expect(() => {
        appConfigServiceSpy.getConfig.mockReturnValue({});
        spectator.service.request('GET', 'test', 'post/1');
      }).toThrowError('There is no a config for ApiService');
    });

    it('should error with no remote service with the type "test"', () => {
      appConfigServiceSpy.getConfig.mockReturnValue({
        serviceEndpoints: {},
      });

      expect(() => {
        spectator.service.request('GET', 'test', 'post/1');
      }).toThrowError('There is no such a remote service with the type "test"');
    });
  });

  describe('request', () => {
    const configBaseUrl = 'https://test.com/api';
    const featureUrl = 'post/1';
    const url = `${configBaseUrl}/${featureUrl}`;

    it('should be equal to url', (done) => {
      appConfigServiceSpy.getConfig.mockReturnValue({
        serviceEndpoints: {
          test: configBaseUrl,
        },
      });

      spectator.service.request('GET', 'test', featureUrl, false).subscribe();
      const request = controller.expectOne(req => req.method === 'GET');
      request.flush({});

      setTimeout(() => {
        expect(request.request.method).toEqual('GET');
        expect(request.request.url).toEqual(url);
        done();
      }, 10);
    });

    it('should have called capture() and release()', (done) => {
      appConfigServiceSpy.getConfig.mockReturnValue({
        serviceEndpoints: {
          test: configBaseUrl,
        },
      });

      spectator.service.request('GET', 'test', featureUrl).subscribe();
      const request = controller.expectOne(req => req.method === 'GET');
      request.flush({});

      setTimeout(() => {
        expect(spinnerServiceSpy.capture).toHaveBeenCalled();
        expect(spinnerServiceSpy.release).toHaveBeenCalled();
        done();
      }, 10);
    });

    it('should have called get() and return response', (done) => {
      const testResponse = { testValue: 'some test value' };
      appConfigServiceSpy.getConfig.mockReturnValue({
        serviceEndpoints: {
          test: configBaseUrl,
        },
      });

      spectator.service.get('test', featureUrl).subscribe(value => {
        expect(value).toEqual(testResponse);
        done();
      });

      const request = controller.expectOne(url);
      request.flush(testResponse);
      controller.verify();
    });

    function callApiMethod(method: 'post' | 'patch' | 'put' | 'delete', done: jest.DoneCallback) {
      const testResponse = { testValue: 'some test value' };
      appConfigServiceSpy.getConfig.mockReturnValue({
        serviceEndpoints: {
          test: configBaseUrl,
        },
      });

      spectator.service[method]('test', featureUrl, {
        name: 'some name',
        age: 21,
        address: 'street Avenue, house 9',
      }, true, { headers: { Authorization: 'Bearer a445bcee345cd537c' } }).subscribe(value => {
        expect(value).toEqual(testResponse);
        done();
      });

      const request = controller.expectOne(url);
      request.flush(testResponse);
      controller.verify();
    }

    it('should have called post() and return response', (done) => {
      callApiMethod('post', done);
    });

    it('should have called patch() and return response', (done) => {
      callApiMethod('patch', done);
    });

    it('should have called put() and return response', (done) => {
      callApiMethod('put', done);
    });

    it('should have called delete() and return response', (done) => {
      callApiMethod('delete', done);
    });
  });
});
