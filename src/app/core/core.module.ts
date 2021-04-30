import { AppRouterStateSerializer } from './router/serializer/app-router-store.serializer';
import { SaveChangesGuard } from './guard/save-changes.guard';
import { AuthGuard } from './guard/auth.guard';
import { NgModule, Inject, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from './service/auth.service';
import { environment } from '@environments/environment';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule, RouterStateSerializer } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    // environment.production ? [] : StoreDevtoolsModule.instrument({ name: 'sdfsdfsdf', maxAge: 25, logOnly: environment.production }),
    NgxsModule.forRoot([]),
    NgxsStoragePluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    environment.production ? [] : NgxsReduxDevtoolsPluginModule.forRoot({ maxAge: 25 }),
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: AppRouterStateSerializer
    },
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
