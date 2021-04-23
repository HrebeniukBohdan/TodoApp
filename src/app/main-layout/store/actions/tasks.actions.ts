import { ITaskCreationalData, ITaskState } from '@main-layout/model/tasks.model';
import { ITaskData } from '@main-layout/model/tasks.model';

export enum TasksActionTypes {
  Load = '[Tasks] Load Tasks',
  CommonFailure = '[Tasks] Common Request Tasks Failure',
  Add = '[Tasks] Add Task',
  Edit = '[Tasks] Edit Task',
  GotoTaskPage = '[Tasks] Go To Task Page',
  SaveOnDeactivate = '[Tasks] Save On Deactivate',
  ChangeStatus = '[Tasks] Change Task Status'
}

export namespace TasksActions {
  export class Load {
    static readonly type: TasksActionTypes = TasksActionTypes.Load;
  }

  export class ChangeStatus {
    static readonly type: TasksActionTypes = TasksActionTypes.ChangeStatus;
    constructor(public payload: { taskData: ITaskData }) { }
  }

  export class Edit {
    static readonly type: TasksActionTypes = TasksActionTypes.Edit;
    constructor(public payload: { taskData: ITaskData }) { }
  }

  export class Add {
    static readonly type: TasksActionTypes = TasksActionTypes.Add;
    constructor(public payload: { taskData: ITaskCreationalData }) { }
  }

  export class GotoTaskPage {
    static readonly type: TasksActionTypes = TasksActionTypes.GotoTaskPage;
    constructor(public payload: { taskId: string }) { }
  }

  export class SaveOnDeactivate {
    static readonly type: TasksActionTypes = TasksActionTypes.SaveOnDeactivate;
    constructor(public payload: { activeTaskState: ITaskState, taskData: ITaskCreationalData|ITaskData }) { }
  }

  export class CommonFailure {
    static readonly type: TasksActionTypes = TasksActionTypes.CommonFailure;
    constructor(public payload: { error: any }) { }
  }
}
