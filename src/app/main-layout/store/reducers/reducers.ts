import * as fromSettings from './settings.reducer';
import * as fromTasks from './tasks.reducer';

export const mainFeatureKey = 'main';

export interface MainLayoutState {
  settings: fromSettings.SettingsState;
  tasks: fromTasks.TasksState;
}

export const reducers = {
  settings: fromSettings.reducer,
  tasks: fromTasks.reducer
};
