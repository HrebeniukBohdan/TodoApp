import { SignInCredentials } from '@core/model/auth.model';


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

export namespace AuthActions {
  export class SignIn {
    static readonly type: AuthActionTypes = AuthActionTypes.SignIn;
    constructor(public payload: { credentials: SignInCredentials }) { }
  }

  export class SignInSuccess {
    static readonly type: AuthActionTypes = AuthActionTypes.SignInSuccess;
    constructor(public payload: { token: string }) { }
  }

  export class SignInFailure {
    static readonly type: AuthActionTypes = AuthActionTypes.SignInFailure;
    constructor(public payload: { error: any }) { }
  }

  export class SignInEraseError {
    static readonly type: AuthActionTypes = AuthActionTypes.SignInEraseError;
  }

  export class SignOut {
    static readonly type: AuthActionTypes = AuthActionTypes.SignOut;
  }

  export class SignOutSuccess {
    static readonly type: AuthActionTypes = AuthActionTypes.SignOutSuccess;
  }

  export class GoToRoute {
    static readonly type: AuthActionTypes = AuthActionTypes.GoToRoute;
    constructor(public payload: { url: string }) { }
  }

  export class SwitchPasswordVisibility {
    static readonly type: AuthActionTypes = AuthActionTypes.SwitchPasswordVisibility;
  }
}
