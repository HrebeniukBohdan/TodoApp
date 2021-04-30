import {
  ITaskCreationalData,
  PriorityConfig,
  TaskData
} from '@main-layout/model/tasks.model';

export interface TasksStateModel {
  tasks: TaskData[]|null;
  priorityConfigs: PriorityConfig[];
  initialTask: ITaskCreationalData;
}
