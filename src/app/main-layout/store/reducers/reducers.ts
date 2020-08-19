import * as fromSettings from './settings.reducer';
import * as fromTasks from './tasks.reducer';

export const mainFeatureKey = 'mainFeature';

export interface MainLayoutState {
  [fromSettings.settingsFeatureKey]: fromSettings.SettingsState;
  [fromTasks.tasksFeatureKey]: fromTasks.TasksState;
}

export const reducers = {
  [fromSettings.settingsFeatureKey]: fromSettings.reducer,
  [fromTasks.tasksFeatureKey]: fromTasks.reducer
};
