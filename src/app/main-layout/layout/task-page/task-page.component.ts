import { EditTask } from './../../store/actions/tasks.actions';
import { GoBack } from './../../store/actions/main.actions';
import { ITaskState, ITaskCreationalData, ITaskData } from './../../model/tasks.model';
import { selectTaskStateOperator } from './../../store/selectors/task.selectors';
import { UtilsService } from '@shared/service/utils.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap, mapTo, tap, map, delay } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable, of, forkJoin } from 'rxjs';
import { CanComponentDeactivate } from '@core/model/save-changes-guard.model';
import { TaskData } from '@main-layout/model/tasks.model';
import { Store, select } from '@ngrx/store';
import { LoadTasks, AddTask } from '@main-layout/store/actions/tasks.actions';

@Component({
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit, CanComponentDeactivate {

  public state$: Observable<ITaskState> = this.store.select(selectTaskStateOperator);

  @ViewChild('formCtrl') form: NgForm;

  private saveBtnPressed: boolean = false;

  constructor(private readonly store: Store, private utilsService: UtilsService) { }

  public ngOnInit(): void {
    this.store.dispatch(new LoadTasks());
  }

  public processTask(state: ITaskState, taskData: ITaskCreationalData = this.form.value): void {
    this.saveBtnPressed = true;

    this.store.dispatch(
      state.editMode ?
      new EditTask({ taskData: {...state.task as ITaskData, ...taskData} })
      :
      new AddTask({ taskData })
    );
  }

  public goBack(): void {
    this.store.dispatch(new GoBack());
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (this.form && !this.saveBtnPressed && this.form.valid && this.form.dirty)
    {
      const showPopup$ = this.utilsService.showMessage(
        false, 'Warning', [
          'The form contains some changes.',
          'Would you like to save the proggress?'
        ], true
      );

      return this.state$.pipe(
        switchMap(state => forkJoin([of(state), showPopup$])),
        tap(([state, save]) => save ? this.processTask(state) : true),
        mapTo(true)
      );
    }

    return true;
  }

}
