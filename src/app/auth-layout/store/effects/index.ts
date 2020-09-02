import { AuthActionTypes, SignInSuccess, SignInFailure, SignIn, SignOutSuccess, GoToRoute } from '@auth-layout/store/actions';
import { AuthService } from '@core/service/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect()
  signIn$: Observable<SignInSuccess | SignInFailure | GoToRoute> = this.actions$.pipe(
    ofType(AuthActionTypes.SignIn),
    switchMap(({ payload: { credentials }}: SignIn) => this.authApi.signIn(credentials).pipe(
        switchMap(({ token }) => [
          new SignInSuccess({ token }),
          new GoToRoute({ url: '/' })
        ]),
        catchError(error => of(new SignInFailure({ error })))
      )
    )
  );

  @Effect()
  signOut$: Observable<SignOutSuccess | GoToRoute> = this.actions$.pipe(
    ofType(AuthActionTypes.SignOut),
    tap(() => this.authApi.signOut()),
    switchMap(() => [
      new SignOutSuccess(),
      new GoToRoute({ url: '/sign-in' })
    ])
  );

  @Effect({ dispatch: false })
  goRoot$: Observable<GoToRoute>  = this.actions$.pipe(
    ofType(AuthActionTypes.GoToRoute),
    tap(({ payload: { url }}: GoToRoute) => this.router.navigateByUrl(url))
  );

  constructor(
    private actions$: Actions,
    private authApi: AuthService,
    private router: Router
  ) {}
}
