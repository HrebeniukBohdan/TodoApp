import { selectTasksState } from './../../store/selectors/tasks.selectors';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITaskData } from '@main-layout/model/tasks.model';
import { Store } from '@ngrx/store';
import { LoadTasks, ChangeTaskStatus, GotoTaskPage } from '@main-layout/store/actions/tasks.actions';

@Component({
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPageComponent implements OnInit {

  public tasks$: Observable<ITaskData[]> = this.store.select(selectTasksState);

  constructor(private readonly store: Store) { }

  public ngOnInit(): void {
    this.store.dispatch(new LoadTasks());
  }

  public gotoTaskPage(taskId: string): void {
    this.store.dispatch(new GotoTaskPage({ taskId }));
  }

  public changeTaskStatus(taskData: ITaskData): void {
    this.store.dispatch(new ChangeTaskStatus({ taskData }));
  }

}
