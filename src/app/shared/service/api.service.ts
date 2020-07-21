import { AppConfig } from './app-config.service';
import { SpinnerService } from './spinner.service';
import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

type RequestOptions = {
  headers?: HttpHeaders | {[header: string]: string | string[]},
  params?: HttpParams | {[param: string]: string | string[]},
  withCredentials?: boolean,
};

type RequestOptionsWithBody = RequestOptions & { body?: any };

type HttpMethod = 'GET'|'POST'|'PATCH'|'PUT'|'DELETE';

interface IApiConfig { [remoteServiseName: string]: string; }

interface IApiConfigContainable {
  serviceEndpoints: IApiConfig;
}

export interface IApiService<K extends string> {
  request<T>(method: HttpMethod, serviceType: K, url: string, withSpinner?: boolean, options?: RequestOptionsWithBody): Observable<T>;
  get<T>(serviceType: K, url: string, withSpinner?: boolean, options?: RequestOptions): Observable<T>;
  post<T>(serviceType: K, url: string, body: any, withSpinner?: boolean, options?: RequestOptions): Observable<T>;
  patch<T>(serviceType: K, url: string, body: any, withSpinner?: boolean, options?: RequestOptions): Observable<T>;
  put<T>(serviceType: K, url: string, body: any, withSpinner?: boolean, options?: RequestOptions): Observable<T>;
  delete<T>(serviceType: K, url: string, body: any, withSpinner?: boolean, options?: RequestOptions): Observable<T>;
}

export const API_SERVICE = new InjectionToken<IApiService<string>>('API.Service');

@Injectable()
export class ApiService implements IApiService<string> {
  constructor(
    private appConfig: AppConfig,
    private httpClient: HttpClient,
    private spinner: SpinnerService) { }

  public request<T>(
    method: HttpMethod, serviceType: string, url: string, withSpinner: boolean = true, options?: RequestOptionsWithBody
  ): Observable<T> {
    const req = this.httpClient.request<T>(
      method,
      this.prepareFullUrl(serviceType, url),
      options
    );

    return withSpinner ? this.wrapWithSpinner(req) : req;
  }

  /**
   * get
   */
  public get<T>(serviceType: string, url: string, withSpinner: boolean = true, options?: RequestOptions): Observable<T> {
    return this.request('GET', serviceType, url, withSpinner, options);
  }

  /**
   * post
   */
  public post<T>(serviceType: string, url: string, body: any, withSpinner: boolean = true, options?: RequestOptions): Observable<T> {
    return this.request('POST', serviceType, url, withSpinner, this.mergeOptionsWithBody(body, options));
  }

  /**
   * patch
   */
  public patch<T>(serviceType: string, url: string, body: any, withSpinner: boolean = true, options?: RequestOptions): Observable<T> {
    return this.request('PATCH', serviceType, url, withSpinner, this.mergeOptionsWithBody(body, options));
  }

  /**
   * put
   */
  public put<T>(serviceType: string, url: string, body: any, withSpinner: boolean = true, options?: RequestOptions): Observable<T> {
    return this.request('PUT', serviceType, url, withSpinner, this.mergeOptionsWithBody(body, options));
  }

  /**
   * delete
   */
  public delete<T>(serviceType: string, url: string, body: any, withSpinner: boolean = true, options?: RequestOptions): Observable<T> {
    return this.request('DELETE', serviceType, url, withSpinner, this.mergeOptionsWithBody(body, options));
  }

  private prepareFullUrl(serviceType: string, url: string): string {
    const urlServiceMap = this.appConfig.getConfig<IApiConfigContainable>().serviceEndpoints;
    if (!urlServiceMap) {
      throw new Error(`There is no a config for ApiService`);
    }
    const baseUrl = urlServiceMap[serviceType];
    if (!baseUrl) {
      throw new Error(`There is no such a remote service with the type "${serviceType}"`);
    }

    return `${baseUrl}/${url}`;
  }

  private wrapWithSpinner<T>(obs: Observable<T>): Observable<T> {
    this.spinner.capture();

    return obs.pipe(
      finalize(() => this.spinner.release())
    );
  }

  private mergeOptionsWithBody(body: any, options: RequestOptions): RequestOptionsWithBody {
    return options ? { body, ...options } : { body };
  }
}
