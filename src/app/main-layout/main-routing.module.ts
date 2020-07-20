import { SaveChangesGuard } from '../core/guard/save-changes.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './layout/main/main.component';
import { TasksPageComponent } from './layout/tasks-page/tasks-page.component';
import { SettingsPageComponent } from './layout/settings-page/settings-page.component';
import { TaskPageComponent } from './layout/task-page/task-page.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
      { path: '', redirectTo: 'tasks'},
      { path: 'settings', component: SettingsPageComponent },
      { path: 'tasks', component: TasksPageComponent },
      { path: 'tasks/one/:id', component: TaskPageComponent, canDeactivate: [SaveChangesGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
