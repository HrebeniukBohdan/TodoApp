import { AuthService } from './../../../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { SignInCredentials } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  public params: SignInCredentials = { username: null, password: null };
  public hide: boolean = true;
  public error: { message: string };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSingInClick(): void {
    this.authService.signIn(this.params).subscribe(
      () => this.router.navigateByUrl('/'),
      error => this.error = { message: 'Username or password is invalid' }
    );
  }

  public onMessageBoxClose(): void {
    this.error = null;
  }

}
