import { dispatch } from '@core/utils';
import { TasksAction } from '@main-layout/state/action/tasks.action';
import { TasksQuery } from '@main-layout/state/query/tasks.query';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITaskData } from '@main-layout/model/tasks.model';

@Component({
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPageComponent implements OnInit {

  tasks$: Observable<ITaskData[]> = this.query.tasks$;

  constructor(
    private readonly query: TasksQuery,
    private readonly action: TasksAction
  ) { }

  public ngOnInit(): void {
    dispatch(this.action.load());
  }

  public gotoTaskPage(taskId: string): void {
    dispatch(this.action.gotoTaskPage(taskId));
  }

  public changeTaskStatus(taskData: ITaskData): void {
    dispatch(this.action.changeStatus(taskData));
  }

}
