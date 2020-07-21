import { AuthService } from '@core/service/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInCredentials } from '@core/model/auth.model';

@Component({
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

  public params: SignInCredentials = { username: null, password: null };
  public hide: boolean = true;
  public error: { message: string };

  constructor(private authService: AuthService, private router: Router) { }

  public onSingInClick(): void {
    this.authService.signIn(this.params).subscribe(
      () => this.router.navigateByUrl('/'),
      () => this.error = { message: 'Username or password is invalid' }
    );
  }

  public onMessageBoxClose(): void {
    this.error = null;
  }

}
