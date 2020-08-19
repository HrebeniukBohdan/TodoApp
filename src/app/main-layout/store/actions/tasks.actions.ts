import { ITaskCreationalData } from './../../model/tasks.model';
import { Action } from '@ngrx/store';
import { ITaskRawData, ITaskData } from '@main-layout/model/tasks.model';

export enum TasksActionTypes {
  LoadTasks = '[Tasks] Load Tasks',
  LoadTasksSuccess = '[Tasks] Load Tasks Success',
  CommonRequestTasksFailure = '[Tasks] Common Request Tasks Failure',
  AddTask = '[Tasks] Add Task',
  AddTaskSuccess = '[Tasks] Add Task Success',
  EditTask = '[Tasks] Edit Task',
  EditTaskSuccess = '[Tasks] Edit Task Success',
  ChangeTaskStatus = '[Tasks] Change Task Status',
  ChangeTaskStatusSuccess = '[Tasks] Change Task Status Success',
  GotoTaskPage = '[Tasks] Goto Task Page'
}

export class LoadTasks implements Action {
  readonly type: TasksActionTypes = TasksActionTypes.LoadTasks;
}

export class LoadTasksSuccess implements Action {
  readonly type: TasksActionTypes = TasksActionTypes.LoadTasksSuccess;
  constructor(public payload: { tasksRawData: ITaskRawData[] }) { }
}

export class CommonRequestTasksFailure implements Action {
  readonly type: TasksActionTypes = TasksActionTypes.CommonRequestTasksFailure;
  constructor(public payload: { error: any }) { }
}

export class ChangeTaskStatus implements Action {
  readonly type: TasksActionTypes = TasksActionTypes.ChangeTaskStatus;
  constructor(public payload: { taskData: ITaskData }) { }
}

export class ChangeTaskStatusSuccess implements Action {
  readonly type: TasksActionTypes = TasksActionTypes.ChangeTaskStatusSuccess;
  constructor(public payload: { taskRawData: ITaskRawData }) { }
}

export class EditTask implements Action {
  readonly type: TasksActionTypes = TasksActionTypes.EditTask;
  constructor(public payload: { taskData: ITaskData }) { }
}

export class EditTaskSuccess implements Action {
  readonly type: TasksActionTypes = TasksActionTypes.EditTaskSuccess;
  constructor(public payload: { taskRawData: ITaskRawData }) { }
}

export class AddTask implements Action {
  readonly type: TasksActionTypes = TasksActionTypes.AddTask;
  constructor(public payload: { taskData: ITaskCreationalData }) { }
}

export class AddTaskSuccess implements Action {
  readonly type: TasksActionTypes = TasksActionTypes.AddTaskSuccess;
  constructor(public payload: { taskRawData: ITaskRawData }) { }
}

export class GotoTaskPage implements Action {
  readonly type: TasksActionTypes = TasksActionTypes.GotoTaskPage;
  constructor(public payload: { taskId: string }) { }
}

export type TasksActions =  LoadTasks |
                            LoadTasksSuccess |
                            ChangeTaskStatus |
                            ChangeTaskStatusSuccess |
                            AddTask |
                            AddTaskSuccess |
                            EditTask |
                            EditTaskSuccess |
                            CommonRequestTasksFailure;
