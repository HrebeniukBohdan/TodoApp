
import { ITaskState } from './../../model/tasks.model';
import { RouterState } from './../../../core/model/router.model';
import { selectActiveRoute } from './../../../core/router/selector/active-route-state.selector';
import { selectMainState } from './main.selector';
import { createSelector, select } from '@ngrx/store';
import { MainLayoutState } from '../reducers/reducers';
import { filter } from 'rxjs/operators';
import { pipe } from 'rxjs';

interface AppState {
  router: RouterState;
}

const selectAddEditTaskState = createSelector(
  selectActiveRoute,
  selectMainState,
  ({ state }: RouterState, { tasksSubFeature: { tasks, priorityConfigs, initialTask }}: MainLayoutState) => {
    const taskState = {
      editMode: false,
      task: null,
      priorityConfigs
    };

    if (state.params.id === 'new') {
      taskState.task = initialTask;
    } else {
      const id = parseInt(state.params.id, 10);
      taskState.task = tasks?.find(task => task.id === id);
      taskState.editMode = true;
    }

    return taskState as ITaskState;
  }
);

// in order to avoid of using the selector with wrong component and some not needed effect we filter values by route url
export const selectTaskStateOperator = pipe(
  filter(({ router: { state } }: AppState) => state.url.includes('/tasks/one/')),
  select(selectAddEditTaskState)
);
