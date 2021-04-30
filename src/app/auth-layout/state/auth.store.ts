import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AuthStateModel } from './auth.model';

const initialState: AuthStateModel = {
  ui: {
    credentials: { username: null, password: null },
    isPasswordVisible: false,
    error: null
  },
  token: null,
};

@StoreConfig({ name: 'auth' })
@Injectable()
export class AuthStore extends Store<AuthStateModel> {
  constructor() {
    super(initialState);
  }
}
