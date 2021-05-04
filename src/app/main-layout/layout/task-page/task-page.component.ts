import { RouterAction } from '@core/router/router.action';
import { dispatch } from '@core/utils';
import { TasksAction } from '@main-layout/state/action/tasks.action';
import { TasksQuery } from '@main-layout/state/query/tasks.query';
import { ITaskState, ITaskCreationalData, ITaskData } from '@main-layout/model/tasks.model';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '@core/model/save-changes-guard.model';

@Component({
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPageComponent implements OnInit, CanComponentDeactivate {

  public state$: Observable<ITaskState> = this.query.activeTaskData$;

  @ViewChild('formCtrl') form: NgForm;

  private saveBtnPressed: boolean = false;

  constructor(
    private readonly query: TasksQuery,
    private readonly action: TasksAction,
    private readonly routerAction: RouterAction
  ) { }

  public ngOnInit(): void {
    dispatch(this.action.load());
  }

  public processTask(state: ITaskState, taskData: ITaskCreationalData = this.form.value): Observable<boolean | void> {
    this.saveBtnPressed = true;

    return dispatch(
      state.editMode ?
      this.action.edit({...state.task as ITaskData, ...taskData})
      :
      this.action.add(taskData)
    );
  }

  public goBack(): void {
    dispatch(this.routerAction.navigate('/'));
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (this.form && !this.saveBtnPressed && this.form.valid && this.form.dirty)
    {
      return this.state$.pipe(
        take(1),
        switchMap(
          activeTaskState =>
              dispatch(this.action.saveOnDeactivate(activeTaskState, this.form.value))
        )
      );
    }

    return true;
  }

}
