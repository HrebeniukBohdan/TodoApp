import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { UtilsService } from '@shared/service/utils.service';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { AppConfig, resolveAppConfigFactory } from '@shared/service/app-config.service';
import { ApiService, API_SERVICE } from '@shared/service/api.service';
import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '@shared/service/spinner.service';
import { SpinnerShowDirective } from '@shared/directive/spinner-show.directive';
import { HttpClientModule } from '@angular/common/http';
import { LoadingScreenComponent } from '@shared/component/loading-screen/loading-screen.component';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MessageBoxComponent } from '@shared/component/message-box/message-box.component';
import { MatIconModule } from '@angular/material/icon';
import { MessageDialogComponent } from '@shared/component/message-dialog/message-dialog.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
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
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatIconModule,
        MatDialogModule,
        MatToolbarModule,
        MatButtonModule
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
