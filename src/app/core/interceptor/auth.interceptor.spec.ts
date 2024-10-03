import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '@core/service/auth.service';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authService: jasmine.SpyObj<AuthService>;
  let next: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signIn', 'signOut'], {
      isAuthenticated: false,
      token: null,
    });

    const nextSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: HttpHandler, useValue: nextSpy }
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    next = TestBed.inject(HttpHandler) as jasmine.SpyObj<HttpHandler>;
  });

  it('should add x-auth-token header if the user is authenticated', () => {
    // Симулюємо автентифікацію користувача
    Object.defineProperty(authService, 'isAuthenticated', { get: () => true });
    Object.defineProperty(authService, 'token', { get: () => 'test-token' });

    const request = new HttpRequest('GET', '/test-url');
    
    next.handle.and.returnValue(of({} as HttpEvent<any>));

    interceptor.intercept(request, next).subscribe();

    const httpRequestCaptor = next.handle.calls.mostRecent().args[0] as HttpRequest<any>;

    // Перевіряємо, що заголовок було додано
    expect(httpRequestCaptor.headers.has('x-auth-token')).toBeTrue();
    expect(httpRequestCaptor.headers.get('x-auth-token')).toBe('test-token');
  });

  it('should not add x-auth-token header if the user is not authenticated', () => {
    // Симулюємо неавтентифікованого користувача
    Object.defineProperty(authService, 'isAuthenticated', { get: () => false });

    const request = new HttpRequest('GET', '/test-url');

    next.handle.and.returnValue(of({} as HttpEvent<any>));

    interceptor.intercept(request, next).subscribe();

    const httpRequestCaptor = next.handle.calls.mostRecent().args[0] as HttpRequest<any>;

    // Перевіряємо, що заголовок не було додано
    expect(httpRequestCaptor.headers.has('x-auth-token')).toBeFalse();
  });
});
