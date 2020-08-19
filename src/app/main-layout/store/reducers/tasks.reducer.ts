import { AddTaskSuccess, EditTaskSuccess } from './../actions/tasks.actions';
import { UtilsService } from '@shared/service/utils.service';
import { TasksActionTypes, LoadTasksSuccess, ChangeTaskStatusSuccess } from '../actions/tasks.actions';
import { Action } from '@ngrx/store';
import { TaskData, PriorityConfig, PRIORITY_CONFIGS, INITIAL_TASK_DATA, ITaskCreationalData } from '@main-layout/model/tasks.model';

export const tasksFeatureKey = 'tasksSubFeature';

export interface TasksState {
  tasks: TaskData[]|null;
  priorityConfigs: PriorityConfig[];
  initialTask: ITaskCreationalData;
}

export const initialState: TasksState = {
  tasks: null,
  priorityConfigs: PRIORITY_CONFIGS,
  initialTask: INITIAL_TASK_DATA
};

export function reducer(state = initialState, action: Action): TasksState {
  switch (action.type) {
    case TasksActionTypes.LoadTasksSuccess:
      return {
        ...state,
        tasks: (action as LoadTasksSuccess).payload.tasksRawData.map(
          data => new TaskData().deserialize(data)
        )
      };

    case TasksActionTypes.ChangeTaskStatusSuccess:
      return {
        ...state,
        tasks: UtilsService.replaceListItem(
          state.tasks, new TaskData().deserialize((action as ChangeTaskStatusSuccess).payload.taskRawData)
        )
      };

    case TasksActionTypes.EditTaskSuccess:
      return {
        ...state,
        tasks: UtilsService.replaceListItem(
          state.tasks, new TaskData().deserialize((action as EditTaskSuccess).payload.taskRawData)
        )
      };

    case TasksActionTypes.AddTaskSuccess:
      return {
        ...state,
        tasks: [
          ...state.tasks, new TaskData().deserialize((action as AddTaskSuccess).payload.taskRawData)
        ]
      };

    default:
      return state;
  }
}
