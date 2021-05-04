import { RouterAction } from './router/router.action';
import { SaveChangesGuard } from './guard/save-changes.guard';
import { AuthGuard } from './guard/auth.guard';
import { NgModule, Inject, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from './service/auth.service';
import { environment } from '@environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    AkitaNgRouterStoreModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    RouterAction,
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
