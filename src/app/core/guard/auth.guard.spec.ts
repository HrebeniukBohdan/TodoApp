import { createServiceFactory, SpectatorService, mockProvider, SpyObject } from '@ngneat/spectator/jest';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { AuthGuard } from './auth.guard';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let spectator: SpectatorService<AuthGuard>;
  let authService: SpyObject<AuthService>;
  let router: SpyObject<Router>;

  const createService = createServiceFactory({
    service: AuthGuard,
    providers: [
      mockProvider(AuthService, {
        isAuthenticated: false, // Початкове значення для тестування
      }),
      mockProvider(Router, {
        parseUrl: jest.fn(),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    authService = spectator.inject(AuthService);
    router = spectator.inject(Router);
  });

  it('should allow activation if user is authenticated', () => {
    // Мокування значення isAuthenticated для AuthService
    Object.defineProperty(authService, 'isAuthenticated', { get: () => true });

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = spectator.service.canActivate(route, state);
    expect(result).toBe(true);
  });

  it('should redirect to sign-in if user is not authenticated', () => {
    // Встановлюємо isAuthenticated на false
    Object.defineProperty(authService, 'isAuthenticated', { get: () => false });

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const urlTree = {} as UrlTree;

    router.parseUrl.mockReturnValue(urlTree);

    const result = spectator.service.canActivate(route, state);
    expect(result).toBe(urlTree);
    expect(router.parseUrl).toHaveBeenCalledWith('/sign-in');
  });
});
