import { Router } from '@angular/router';
import { tap, map, catchError, mergeMap } from 'rxjs/operators';
import { SignInCredentials } from '@core/model/auth.model';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AuthService } from '@core/service/auth.service';
import { AuthActions } from '../actions';
import { EMPTY, from, Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';

export interface AuthStateModel {
  credentials: SignInCredentials;
  token: string | null;
  isPasswordVisible: boolean;
  error: { message: string } | null;
}

@State<AuthStateModel>({
  name: 'authFeature',
  defaults: {
    credentials: { username: null, password: null },
    token: null,
    isPasswordVisible: false,
    error: null
  }
})
@Injectable()
export class AuthState {
  constructor(
    private authApi: AuthService,
    private router: Router
  ) {}

  @Action(AuthActions.SignIn)
  signIn(ctx: StateContext<AuthStateModel>, { payload }: AuthActions.SignIn): Observable<void> {
    return this.authApi.signIn(payload.credentials).pipe(
      map(response => ctx.patchState({ ...payload, ...response })),
      mergeMap(() => ctx.dispatch(new Navigate(['/']))),
      catchError(() => {
        ctx.patchState({ token: null, error: { message: 'Username or password is invalid' } });
        return EMPTY;
      })
    );
  }

  @Action(AuthActions.SignOut)
  signOut(ctx: StateContext<AuthStateModel>): Observable<void> {
    return this.authApi.signOut().pipe(
      // tap(() => this.router.navigateByUrl('/sign-in')),
      tap(() => ctx.patchState({ token: null, error: null })),
      mergeMap(() => ctx.dispatch(new Navigate(['/sign-in'])))
    );
  }

  @Action(AuthActions.SignInEraseError)
  eraseSignInError(ctx: StateContext<AuthStateModel>): void {
    ctx.patchState({ error: null });
  }

  @Action(AuthActions.SwitchPasswordVisibility)
  switchPasswordVisibility(ctx: StateContext<AuthStateModel>): void {
    ctx.patchState({ isPasswordVisible: !ctx.getState().isPasswordVisible });
  }

  @Action(AuthActions.GoToRoute)
  gotoRoute(ctx: StateContext<AuthStateModel>, { payload }: AuthActions.GoToRoute): void {
    this.router.navigateByUrl(payload.url);
  }
}
