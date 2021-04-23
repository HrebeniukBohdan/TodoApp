import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITaskData } from '@main-layout/model/tasks.model';
import { Store, Select } from '@ngxs/store';
import { TasksState } from '@main-layout/store/states/tasks.state';
import { TasksActions } from '@main-layout/store/actions/tasks.actions';

@Component({
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPageComponent implements OnInit {

  @Select(TasksState.selectTasks) tasks$: Observable<ITaskData[]>;

  constructor(private readonly store: Store) { }

  public ngOnInit(): void {
    this.store.dispatch(new TasksActions.Load());
  }

  public gotoTaskPage(taskId: string): void {
    this.store.dispatch(new TasksActions.GotoTaskPage({ taskId }));
  }

  public changeTaskStatus(taskData: ITaskData): void {
    this.store.dispatch(new TasksActions.ChangeStatus({ taskData }));
  }

}
