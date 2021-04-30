import { EMPTY, Observable, of } from 'rxjs';
import { TasksStore } from '@main-layout/state/store/tasks.store';
import { TaskService } from '@main-layout/service/task.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TasksStateModel } from '../model/tasks.model';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { ITaskCreationalData, ITaskData, TaskData } from '@main-layout/model/tasks.model';
import { UtilsService } from '@shared/service/utils.service';

@Injectable()
export class TasksAction {
  constructor(
    private router: Router,
    private store: TasksStore,
    private api: TaskService,
    private utils: UtilsService
  ) {}

  load(): Observable<void | TasksStateModel> {
    const currentState = this.store.getValue();
    return currentState.tasks ? of(currentState) : this.api.fetchTasks().pipe(
      map(
        tasksRawData => this.store.update(
          state => ({ ...state, tasks: tasksRawData.map(data => new TaskData().deserialize(data)) })
        )
      ),
      catchError(error => this.handleError(error))
    );
  }

  add(taskData: ITaskCreationalData): Observable<void | boolean> {
    return this.api.addNewTask(taskData).pipe(
      map(
        taskRawData => this.store.update(
          state => ({
            ...state,
            tasks: [
              ...state.tasks, new TaskData().deserialize(taskRawData)
            ]
        })
      )),
      mergeMap(() => this.router.navigateByUrl('/')),
      catchError(error => this.handleError(error))
    );
  }

  edit(taskData: ITaskData): Observable<void | boolean> {
    return this.api.editTask(taskData).pipe(
      map(
        taskRawData => this.store.update(
          state => ({
            tasks: UtilsService.replaceListItem(
              state.tasks, new TaskData().deserialize(taskRawData)
            )
          })
        )
      ),
      mergeMap(() => this.router.navigateByUrl('/')),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error): Observable<void> {
    const showPopup$ = this.utils.showMessage(
      true, 'Error', [ error.message ], true
    );
    showPopup$.subscribe();

    return EMPTY;
  }
}
