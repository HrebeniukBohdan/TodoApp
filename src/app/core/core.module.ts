import { AppSerializer } from '@core/router/serializer/app-router-store.serializer';
import { SaveChangesGuard } from './guard/save-changes.guard';
import { AuthGuard } from './guard/auth.guard';
import { NgModule, Inject, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from './service/auth.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  routerReducer,
  NavigationActionTiming,
  RouterState
} from '@ngrx/router-store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    StoreModule.forRoot({router: routerReducer}),
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
      serializer: AppSerializer,
      routerState: RouterState.Full
    }),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
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
