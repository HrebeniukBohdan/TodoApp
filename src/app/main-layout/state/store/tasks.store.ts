import { INITIAL_TASK_DATA, PRIORITY_CONFIGS } from '@main-layout/model/tasks.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TasksStateModel } from '../model/tasks.model';

const initialState = {
  tasks: null,
  priorityConfigs: PRIORITY_CONFIGS,
  initialTask: INITIAL_TASK_DATA
};

@StoreConfig({ name: 'tasks' })
@Injectable()
export class TasksStore extends Store<TasksStateModel>  {
  constructor() {
    super(initialState);
  }
}
