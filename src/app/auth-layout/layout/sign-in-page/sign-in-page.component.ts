import { Component } from '@angular/core';
import { SignInCredentials } from '@core/model/auth.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '@auth-layout/store/reducers';
import { SignIn, SignInEraseError, SwitchPasswordVisibility } from '@auth-layout/store/actions';
import { selectAuthState } from '@auth-layout/store/selectors';

@Component({
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

  public state$: Observable<AuthState> = this.store.select(selectAuthState);

  constructor(private readonly store: Store) { }

  public onSingInSubmit(credentials: SignInCredentials): void {
    this.store.dispatch(new SignIn({ credentials }));
  }

  public onPasswordVisibilityClick(): void {
    this.store.dispatch(new SwitchPasswordVisibility());
  }

  public onMessageBoxClose(): void {
    this.store.dispatch(new SignInEraseError());
  }

}
