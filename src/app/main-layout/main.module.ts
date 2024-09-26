import { SettingsService } from './service/settings.service';
import { TaskService } from './service/task.service';
import { TasksPageComponent } from './layout/tasks-page/tasks-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './layout/main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';

import { MenuComponent } from './component/menu/menu.component';
import { SettingsPageComponent } from './layout/settings-page/settings-page.component';
import { TaskPageComponent } from './layout/task-page/task-page.component';
import { TaskItemComponent } from './component/task-item/task-item.component';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { SortCompletedPipe } from './pipe/sort-completed.pipe';

@NgModule({
  declarations: [
    MainComponent,
    TasksPageComponent,
    MenuComponent,
    SettingsPageComponent,
    TaskPageComponent,
    TaskItemComponent,
    SortCompletedPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatRippleModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonToggleModule,
    MatRadioModule,
    SharedModule
  ],
  providers: [
    TaskService,
    SettingsService
  ]
})
export class MainModule { }
