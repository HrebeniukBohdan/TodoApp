import { SaveChangesGuard } from './guard/save-changes.guard';
import { AuthGuard } from './guard/auth.guard';
import { NgModule, Inject, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
    SaveChangesGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() @Inject(CoreModule) parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has been already loaded.');
    }
  }
}
