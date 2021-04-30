import { SignInCredentials } from '@core/model/auth.model';

export interface AuthStateModel {
  ui: {
    credentials: SignInCredentials;
    isPasswordVisible: boolean;
    error: { message: string } | null;
  };
  token: string | null;
}
