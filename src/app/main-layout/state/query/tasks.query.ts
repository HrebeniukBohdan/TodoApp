import { map } from 'rxjs/operators';
import { TasksStore } from '@main-layout/state/store/tasks.store';
import { TasksStateModel } from '../model/tasks.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';
import { ITaskState, TaskData } from '@main-layout/model/tasks.model';
import { RouterQuery } from '@datorama/akita-ng-router-store';

@Injectable()
export class TasksQuery extends Query<TasksStateModel> {
  tasks$: Observable<TaskData[]> = this.select(state => state.tasks);
  activeTaskData$: Observable<ITaskState> = this.select().pipe(
    map(
      ({ tasks, priorityConfigs, initialTask }) => {
        const activeRouteState = this.routerQuery.getValue().state;

        if (!activeRouteState.url.includes('/tasks/one/')) {
          throw new Error('This selector can be used only within Task page');
        }

        const taskState = {
          editMode: false,
          task: null,
          priorityConfigs
        };

        if (activeRouteState.params.id === 'new') {
          taskState.task = initialTask;
        } else {
          const id = parseInt(activeRouteState.params.id, 10);
          taskState.task = tasks?.find(task => task.id === id);
          taskState.editMode = true;
        }

        return taskState as ITaskState;
      }
    )
  );

  constructor(
    protected store: TasksStore,
    private routerQuery: RouterQuery
  ) {
    super(store);
  }
}
