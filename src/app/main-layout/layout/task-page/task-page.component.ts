import { Navigate } from '@ngxs/router-plugin';
import { ITaskState, ITaskCreationalData, ITaskData } from '@main-layout/model/tasks.model';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { switchMap, mapTo } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '@core/model/save-changes-guard.model';
import { Store } from '@ngxs/store';
import { TasksState } from '@main-layout/store/states/tasks.state';
import { TasksActions } from '@main-layout/store/actions/tasks.actions';

@Component({
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPageComponent implements OnInit, CanComponentDeactivate {

  public state$: Observable<ITaskState> = this.store.selectOnce(TasksState.selectActiveTaskData);

  @ViewChild('formCtrl') form: NgForm;

  private saveBtnPressed: boolean = false;

  constructor(private readonly store: Store) { }

  public ngOnInit(): void {
    this.store.dispatch(new TasksActions.Load());
  }

  public processTask(state: ITaskState, taskData: ITaskCreationalData = this.form.value): Observable<void> {
    this.saveBtnPressed = true;

    return this.store.dispatch(
      state.editMode ?
      new TasksActions.Edit({ taskData: {...state.task as ITaskData, ...taskData} })
      :
      new TasksActions.Add({ taskData })
    );
  }

  public goBack(): void {
    this.store.dispatch(new Navigate(['/']));
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (this.form && !this.saveBtnPressed && this.form.valid && this.form.dirty)
    {
      return this.state$.pipe(
        switchMap(
          activeTaskState =>
              this.store.dispatch(new TasksActions.SaveOnDeactivate({ activeTaskState, taskData: this.form.value }))
        ),
        mapTo(true)
      );
    }

    return true;
  }

}
