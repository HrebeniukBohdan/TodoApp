import { Component } from '@angular/core';
import { SignInCredentials } from '@core/model/auth.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState, AuthStateModel } from '@auth-layout/store/states';
import { AuthActions } from '@auth-layout/store/actions';
import { Select } from '@ngxs/store';

@Component({
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

  @Select(AuthState) state$: Observable<AuthStateModel>;

  constructor(private readonly store: Store) { }

  public onSingInSubmit(credentials: SignInCredentials): void {
    this.store.dispatch(new AuthActions.SignIn({ credentials }));
  }

  public onPasswordVisibilityClick(): void {
    this.store.dispatch(new AuthActions.SwitchPasswordVisibility());
  }

  public onMessageBoxClose(): void {
    this.store.dispatch(new AuthActions.SignInEraseError());
  }

}
