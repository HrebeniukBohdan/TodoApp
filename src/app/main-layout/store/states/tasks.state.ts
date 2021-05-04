import { UtilsService } from './../../../shared/service/utils.service';
import { TaskService } from '@main-layout/service/task.service';
import { TasksActions } from '../actions/tasks.actions';
import {
  INITIAL_TASK_DATA,
  ITaskCreationalData,
  ITaskData,
  ITaskState,
  PriorityConfig,
  PRIORITY_CONFIGS,
  TaskData
} from '@main-layout/model/tasks.model';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { RouterStateModel } from '@core/model/router.model';

export interface TasksStateModel {
  tasks: TaskData[]|null;
  priorityConfigs: PriorityConfig[];
  initialTask: ITaskCreationalData;
}

@State<TasksStateModel>({
  name: 'tasksSubFeature',
  defaults: {
    tasks: null,
    priorityConfigs: PRIORITY_CONFIGS,
    initialTask: INITIAL_TASK_DATA
  }
})
@Injectable()
export class TasksState {
  constructor(private tasksApi: TaskService, private utilsService: UtilsService) {}

  @Selector()
  static selectTasks(state: TasksStateModel): TaskData[] {
    return state.tasks;
  }

  @Selector([RouterState])
  static selectActiveTaskData(
    { tasks, priorityConfigs, initialTask }: TasksStateModel,
    { state: activeRouteState }: RouterStateModel
  ): ITaskState {
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

  @Action(TasksActions.Load)
  load(ctx: StateContext<TasksStateModel>): Observable<void | TasksStateModel> {
    const state = ctx.getState();
    return state.tasks ? of(state) : this.tasksApi.fetchTasks().pipe(
      map(tasksRawData => ctx.patchState({ tasks: tasksRawData.map(data => new TaskData().deserialize(data)) })),
      catchError(error => ctx.dispatch(new TasksActions.CommonFailure({ error })))
    );
  }

  @Action(TasksActions.Add)
  add(ctx: StateContext<TasksStateModel>, { payload }: TasksActions.Add): Observable<unknown | TasksStateModel> {
    return this.tasksApi.addNewTask(payload.taskData).pipe(
      map(taskRawData => ctx.patchState({
        tasks: [
          ...ctx.getState().tasks, new TaskData().deserialize(taskRawData)
        ]
      })),
      mergeMap(() => ctx.dispatch(new Navigate(['/']))),
      catchError(error => ctx.dispatch(new TasksActions.CommonFailure({ error })))
    );
  }

  @Action(TasksActions.Edit)
  edit(ctx: StateContext<TasksStateModel>, { payload }: TasksActions.Edit): Observable<unknown | TasksStateModel> {
    return this.tasksApi.editTask(payload.taskData).pipe(
      map(taskRawData => ctx.patchState({
        tasks: UtilsService.replaceListItem(
          ctx.getState().tasks, new TaskData().deserialize(taskRawData)
        )
      })),
      mergeMap(() => ctx.dispatch(new Navigate(['/']))),
      catchError(error => ctx.dispatch(new TasksActions.CommonFailure({ error })))
    );
  }

  @Action(TasksActions.ChangeStatus)
  changeStatus(ctx: StateContext<TasksStateModel>, { payload }: TasksActions.ChangeStatus): Observable<void | TasksStateModel> {
    return this.tasksApi.changeTaskStatus(payload.taskData).pipe(
      map(taskRawData => ctx.patchState({
        tasks: UtilsService.replaceListItem(
          ctx.getState().tasks, new TaskData().deserialize(taskRawData)
        )
      })),
      catchError(error => ctx.dispatch(new TasksActions.CommonFailure({ error })))
    );
  }

  @Action(TasksActions.GotoTaskPage)
  gotoTaskPage(ctx: StateContext<TasksStateModel>, { payload }: TasksActions.GotoTaskPage): Observable<void> {
    return ctx.dispatch(
      new Navigate([`/tasks/one/${payload.taskId}`])
    );
  }

  @Action(TasksActions.SaveOnDeactivate)
  saveOnDeactivate(
    ctx: StateContext<TasksStateModel>,
    { payload: { activeTaskState: state, taskData } }: TasksActions.SaveOnDeactivate
  ): Observable<boolean> {
    const taskAction = state.editMode ?
      new TasksActions.Edit({ taskData: {...state.task as ITaskData, ...taskData} })
      :
      new TasksActions.Add({ taskData });

    const showPopup$ = this.utilsService.showMessage(
      false, 'Warning', [
        'The form contains some changes.',
        'Would you like to save the proggress?'
      ], true
    );

    return showPopup$.pipe(
      switchMap(save => save ? ctx.dispatch(taskAction) : of(true)),
      mapTo(true)
    );
  }

  @Action(TasksActions.CommonFailure)
  handleError(ctx: StateContext<TasksStateModel>, { payload }: TasksActions.CommonFailure): void {
    this.utilsService.showMessage(
      true, 'Error', [ payload.error.message ], false
    ).subscribe();
  }
}
