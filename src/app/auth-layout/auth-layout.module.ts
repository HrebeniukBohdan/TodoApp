import { AuthQuery } from './state/auth.query';
import { AuthStore } from './state/auth.store';
import { AuthAction } from './state/auth.action';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInPageComponent } from './layout/sign-in-page/sign-in-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SignInPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    SharedModule
  ],
  providers: [
    AuthAction,
    AuthStore,
    AuthQuery
  ]
})
export class AuthLayoutModule { }
