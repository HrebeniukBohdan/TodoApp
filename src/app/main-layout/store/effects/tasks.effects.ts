import { GoBack } from './../actions/main.actions';
import { Router } from '@angular/router';
import { TaskService } from '@main-layout/service/task.service';
import {
  LoadTasksSuccess,
  CommonRequestTasksFailure,
  TasksActionTypes,
  ChangeTaskStatus,
  ChangeTaskStatusSuccess,
  GotoTaskPage,
  AddTask,
  AddTaskSuccess,
  EditTaskSuccess,
  EditTask
} from './../actions/tasks.actions';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { first, switchMap, map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class TasksEffects {

  @Effect()
  loadTasks$: Observable<LoadTasksSuccess | CommonRequestTasksFailure> = this.actions$.pipe(
    ofType(TasksActionTypes.LoadTasks),
    first(),
    switchMap(() => this.tasksApi.fetchTasks().pipe(
      map(tasksRawData => new LoadTasksSuccess({ tasksRawData })),
      catchError(error => of(new CommonRequestTasksFailure({ error }))))
    )
  );

  @Effect()
  changeTaskStatus$: Observable<ChangeTaskStatusSuccess | CommonRequestTasksFailure> = this.actions$.pipe(
    ofType(TasksActionTypes.ChangeTaskStatus),
    switchMap(({ payload }: ChangeTaskStatus) => this.tasksApi.changeTaskStatus(payload.taskData).pipe(
      map(taskRawData => new ChangeTaskStatusSuccess({ taskRawData })),
      catchError(error => of(new CommonRequestTasksFailure({ error }))))
    )
  );

  @Effect()
  addTask$: Observable<AddTaskSuccess | GoBack | CommonRequestTasksFailure> = this.actions$.pipe(
    ofType(TasksActionTypes.AddTask),
    switchMap(({ payload }: AddTask) => this.tasksApi.addNewTask(payload.taskData).pipe(
      switchMap(taskRawData => [
        new GoBack(),
        new AddTaskSuccess({ taskRawData })
      ]),
      catchError(error => of(new CommonRequestTasksFailure({ error }))))
    )
  );

  @Effect()
  editTask$: Observable<EditTaskSuccess | GoBack | CommonRequestTasksFailure> = this.actions$.pipe(
    ofType(TasksActionTypes.EditTask),
    switchMap(({ payload }: EditTask) => this.tasksApi.editTask(payload.taskData).pipe(
      switchMap(taskRawData => [
        new GoBack(),
        new EditTaskSuccess({ taskRawData })
      ]),
      catchError(error => of(new CommonRequestTasksFailure({ error }))))
    )
  );

  @Effect({ dispatch: false })
  gotoTaskPage$: Observable<GotoTaskPage>  = this.actions$.pipe(
    ofType(TasksActionTypes.GotoTaskPage),
    tap(({ payload }: GotoTaskPage) => this.router.navigateByUrl(`/tasks/one/${payload.taskId}`))
  );

  constructor(
    private actions$: Actions,
    private tasksApi: TaskService,
    private router: Router
  ) {}

}
