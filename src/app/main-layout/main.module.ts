import { SettingsEffects } from './store/effects/settings.effects';
import { mainFeatureKey, reducers } from './store/reducers/reducers';
import { StoreModule } from '@ngrx/store';
import { SettingsService } from './service/settings.service';
import { TaskService } from './service/task.service';
import { TasksPageComponent } from './layout/tasks-page/tasks-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './layout/main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';

import { MenuComponent } from './component/menu/menu.component';
import { SettingsPageComponent } from './layout/settings-page/settings-page.component';
import { TaskPageComponent } from './layout/task-page/task-page.component';
import { TaskItemComponent } from './component/task-item/task-item.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared/shared.module';
import { SortCompletedPipe } from './pipe/sort-completed.pipe';
import { EffectsModule } from '@ngrx/effects';

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
    FlexLayoutModule,
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
    SharedModule,
    StoreModule.forFeature(mainFeatureKey, reducers),
    EffectsModule.forFeature([SettingsEffects/*, TasksEffects*/])
  ],
  providers: [
    TaskService,
    SettingsService
  ]
})
export class MainModule { }
