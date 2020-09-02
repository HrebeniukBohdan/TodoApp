import { SignInCredentials } from '@core/model/auth.model';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SignIn = '[Auth] Sign In',
  SignInSuccess = '[Auth] Sign In Success',
  SignInFailure = '[Auth] Sign In Failure',
  SignInEraseError = '[Auth] Sign In Erase Error',
  SignOut = '[Auth] Sign Out',
  SignOutSuccess = '[Auth] Sign Out Success',
  GoToRoute = '[Auth] Go To Route',
  SwitchPasswordVisibility = '[Auth] Switch Password Visibility'
}

export class SignIn implements Action {
  readonly type: AuthActionTypes = AuthActionTypes.SignIn;
  constructor(public payload: { credentials: SignInCredentials }) { }
}

export class SignInSuccess implements Action {
  readonly type: AuthActionTypes = AuthActionTypes.SignInSuccess;
  constructor(public payload: { token: string }) { }
}

export class SignInFailure implements Action {
  readonly type: AuthActionTypes = AuthActionTypes.SignInFailure;
  constructor(public payload: { error: any }) { }
}

export class SignInEraseError implements Action {
  readonly type: AuthActionTypes = AuthActionTypes.SignInEraseError;
}

export class SignOut implements Action {
  readonly type: AuthActionTypes = AuthActionTypes.SignOut;
}

export class SignOutSuccess implements Action {
  readonly type: AuthActionTypes = AuthActionTypes.SignOutSuccess;
}

export class GoToRoute implements Action {
  readonly type: AuthActionTypes = AuthActionTypes.GoToRoute;
  constructor(public payload: { url: string }) { }
}

export class SwitchPasswordVisibility implements Action {
  readonly type: AuthActionTypes = AuthActionTypes.SwitchPasswordVisibility;
}

export type AuthActions = SignIn |
                          SignInSuccess |
                          SignInFailure |
                          SignInEraseError |
                          SignOut |
                          SignOutSuccess |
                          GoToRoute;
