import { AuthQuery } from '@auth-layout/state/auth.query';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInCredentials } from '@core/model/auth.model';
import { Observable } from 'rxjs';
import { AuthAction } from '@auth-layout/state/auth.action';
import { AuthStateModel } from '@auth-layout/state/auth.model';
import { dispatch } from '@core/utils';

@Component({
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent {

  state$: Observable<AuthStateModel> = this.query.state$;

  constructor(
    private readonly action: AuthAction,
    private readonly query: AuthQuery
  ) { }

  public onSingInSubmit(credentials: SignInCredentials): void {
    dispatch(this.action.signIn(credentials));
  }

  public onPasswordVisibilityClick(): void {
    dispatch(this.action.switchPasswordVisibility());
  }

  public onMessageBoxClose(): void {
    dispatch(this.action.eraseSignInError());
  }

}
