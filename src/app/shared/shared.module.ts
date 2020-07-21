import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UtilsService } from '@shared/service/utils.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppConfig, resolveAppConfigFactory } from '@shared/service/app-config.service';
import { ApiService, API_SERVICE } from '@shared/service/api.service';
import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '@shared/service/spinner.service';
import { SpinnerShowDirective } from '@shared/directive/spinner-show.directive';
import { HttpClientModule } from '@angular/common/http';
import { LoadingScreenComponent } from '@shared/component/loading-screen/loading-screen.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MessageBoxComponent } from '@shared/component/message-box/message-box.component';
import { MatIconModule } from '@angular/material/icon';
import { MessageDialogComponent } from '@shared/component/message-dialog/message-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    SpinnerShowDirective,
    LoadingScreenComponent,
    MessageBoxComponent,
    MessageDialogComponent
  ],
  exports: [
    SpinnerShowDirective,
    LoadingScreenComponent,
    MessageBoxComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule
  ],
  entryComponents: [
    MessageDialogComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AppConfig,
        SpinnerService,
        UtilsService,
        {
          provide: APP_INITIALIZER,
          useFactory: resolveAppConfigFactory,
          deps: [AppConfig], multi: true
        },
        {
          provide: API_SERVICE,
          useClass: ApiService
        }
      ]
    };
  }
}
