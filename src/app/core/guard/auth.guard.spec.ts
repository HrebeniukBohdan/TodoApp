import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { AuthGuard } from './auth.guard';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      isAuthenticated: false
    });
    const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow activation if user is authenticated', () => {
    Object.defineProperty(authService, 'isAuthenticated', { get: () => true });

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);
    expect(result).toBe(true);
  });

  it('should redirect to sign-in if user is not authenticated', () => {
    Object.defineProperty(authService, 'isAuthenticated', { get: () => false });

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const urlTree = {} as UrlTree;

    router.parseUrl.and.returnValue(urlTree);

    const result = guard.canActivate(route, state);
    expect(result).toBe(urlTree);
    expect(router.parseUrl).toHaveBeenCalledWith('/sign-in');
  });
});
