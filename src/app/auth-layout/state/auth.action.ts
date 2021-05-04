import { dispatch } from '@core/utils';
import { RouterAction } from '@core/router/router.action';
import { AuthStore } from './auth.store';
import { Injectable } from '@angular/core';
import { SignInCredentials } from '@core/model/auth.model';
import { AuthService } from '@core/service/auth.service';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap, catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthAction {
  constructor(private authApi: AuthService, private router: RouterAction, private store: AuthStore) {}

  signIn(credentials: SignInCredentials): Observable<unknown> {
    return this.authApi.signIn(credentials).pipe(
      tap(
        response => this.store.update(
          state => ({ ui: { ...state.ui, credentials }, ...response })
        )
      ),
      mergeMap(() => dispatch(this.router.navigate('/'))),
      catchError(() => {
        this.store.update(
          state => ({ ui: { ...state.ui, error: { message: 'Username or password is invalid' } } })
        );
        return EMPTY;
      })
    );
  }

  signOut(): Observable<unknown> {
    return this.authApi.signOut().pipe(
      tap(() => this.store.update(
        state => ({ ui: { ...state.ui, error: null }, token: null })
      )),
      mergeMap(() => dispatch(this.router.navigate('/sign-in')))
    );
  }

  eraseSignInError(): void {
    this.store.update(
      state => ({ ui: { ...state.ui, error: null }})
    );
  }

  switchPasswordVisibility(): void {
    this.store.update(
      state => ({ ui: { ...state.ui, isPasswordVisible: !state.ui.isPasswordVisible }})
    );
  }
}
