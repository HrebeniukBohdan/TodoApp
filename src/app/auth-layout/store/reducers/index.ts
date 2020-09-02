import { SignInCredentials } from '@core/model/auth.model';
import { AuthActionTypes, SignIn, SignInSuccess } from '@auth-layout/store/actions';
import { Action } from '@ngrx/store';

export const authFeatureKey = 'authFeature';

export interface AuthState {
  credentials: SignInCredentials;
  token: string | null;
  isPasswordVisible: boolean;
  error: { message: string } | null;
}

export const initialState: AuthState = {
  credentials: { username: null, password: null },
  token: null,
  isPasswordVisible: false,
  error: null
};

export function reducer(state = initialState, action: Action): AuthState {
  switch (action.type) {
    case AuthActionTypes.SignIn:
      return { ...state, ...(action as SignIn).payload };

    case AuthActionTypes.SignInSuccess:
      return { ...state, ...(action as SignInSuccess).payload, error: null };

    case AuthActionTypes.SignInFailure:
      return { ...state, token: null, error: {
          message: 'Username or password is invalid'
        }
      };

    case AuthActionTypes.SignInEraseError:
      return { ...state, error: null };

    case AuthActionTypes.SignOutSuccess:
      return { ...state, token: null, error: null };

    case AuthActionTypes.SwitchPasswordVisibility:
      return { ...state, isPasswordVisible: !state.isPasswordVisible };

    default:
      return state;
  }
}
