import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { HttpEvent, HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '@core/service/auth.service';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let spectator: SpectatorService<AuthInterceptor>;
  let interceptor: AuthInterceptor;
  let authService: jest.Mocked<AuthService>;
  let next: { handle: jest.Mock };

  const createService = createServiceFactory({
    service: AuthInterceptor,
    mocks: [AuthService],
  });

  beforeEach(() => {
    spectator = createService();
    interceptor = spectator.service;
    authService = spectator.inject(AuthService) as jest.Mocked<AuthService>;

    // Мокування next.handle, який повертатиме Observable
    next = { handle: jest.fn().mockReturnValue(of({} as HttpEvent<any>)) };
  });

  it('should add x-auth-token header if the user is authenticated', () => {
    // Симулюємо автентифікацію користувача
    Object.defineProperty(authService, 'isAuthenticated', { get: () => true });
    Object.defineProperty(authService, 'token', { get: () => 'test-token' });

    const request = new HttpRequest('GET', '/test-url');

    interceptor.intercept(request, next).subscribe();

    const httpRequestCaptor = next.handle.mock.calls[0][0] as HttpRequest<any>;

    // Перевіряємо, що заголовок було додано
    expect(httpRequestCaptor.headers.has('x-auth-token')).toBe(true);
    expect(httpRequestCaptor.headers.get('x-auth-token')).toBe('test-token');
  });

  it('should not add x-auth-token header if the user is not authenticated', () => {
    // Симулюємо неавтентифікованого користувача
    Object.defineProperty(authService, 'isAuthenticated', { get: () => false });

    const request = new HttpRequest('GET', '/test-url');

    interceptor.intercept(request, next).subscribe();

    const httpRequestCaptor = next.handle.mock.calls[0][0] as HttpRequest<any>;

    // Перевіряємо, що заголовок не було додано
    expect(httpRequestCaptor.headers.has('x-auth-token')).toBe(false);
  });
});
