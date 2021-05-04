import { dispatch } from '@core/utils';
import { RouterAction } from '@core/router/router.action';
import { EMPTY, from, Observable, of } from 'rxjs';
import { TasksStore } from '@main-layout/state/store/tasks.store';
import { TaskService } from '@main-layout/service/task.service';
import { Injectable } from '@angular/core';
import { TasksStateModel } from '../model/tasks.model';
import { map, catchError, mergeMap, switchMap, mapTo } from 'rxjs/operators';
import { ITaskCreationalData, ITaskData, ITaskState, TaskData } from '@main-layout/model/tasks.model';
import { UtilsService } from '@shared/service/utils.service';

@Injectable()
export class TasksAction {
  constructor(
    private routerAction: RouterAction,
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

  add(taskData: ITaskCreationalData, goBack: boolean = true): Observable<void | boolean> {
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
      mergeMap(() => goBack ? dispatch(this.routerAction.navigate('/')) : of(true)),
      catchError(error => this.handleError(error))
    );
  }

  edit(taskData: ITaskData, goBack: boolean = true): Observable<void | boolean> {
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
      mergeMap(() => goBack ? dispatch(this.routerAction.navigate('/')) : of(true)),
      catchError(error => this.handleError(error))
    );
  }

  changeStatus(taskData: ITaskData): Observable<void | TasksStateModel> {
    return this.api.changeTaskStatus(taskData).pipe(
      map(
        taskRawData => this.store.update(
          state => ({
            tasks: UtilsService.replaceListItem(
              state.tasks, new TaskData().deserialize(taskRawData))
          })
        )
      ),
      catchError(error => this.handleError(error))
    );
  }

  gotoTaskPage(taskId: string): Observable<boolean> {
    return dispatch(
      this.routerAction.navigate(`/tasks/one/${taskId}`)
    );
  }

  saveOnDeactivate(activeTaskState: ITaskState, taskData: ITaskCreationalData|ITaskData): Observable<boolean> {
    const state = activeTaskState;
    const saveEditTask = () => state.editMode ?
      this.edit({...state.task as ITaskData, ...taskData}, false)
      :
      this.add(taskData, false);

    const showPopup$ = this.utils.showMessage(
      false, 'Warning', [
        'The form contains some changes.',
        'Would you like to save the proggress?'
      ], true
    );

    return showPopup$.pipe(
      switchMap(save => save ? saveEditTask() : of(true)),
      mapTo(true)
    );
  }

  private handleError(error): Observable<void> {
    this.utils.showMessage(
      true, 'Error', [ error.message ], false
    ).subscribe();

    return EMPTY;
  }
}
