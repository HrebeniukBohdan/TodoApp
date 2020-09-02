
import { ITaskState } from './../../model/tasks.model';
import { RouterState } from './../../../core/model/router.model';
import { selectActiveRoute } from './../../../core/router/selector/active-route-state.selector';
import { selectMainState } from './main.selector';
import { createSelector } from '@ngrx/store';
import { MainLayoutState } from '../reducers/reducers';

export const selectTaskStateOperator = createSelector(
  selectActiveRoute,
  selectMainState,
  ({ state }: RouterState, { tasksSubFeature: { tasks, priorityConfigs, initialTask }}: MainLayoutState) => {
    if (!state.url.includes('/tasks/one/')) {
      throw new Error('This selector can be used only within Task page');
    }

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
