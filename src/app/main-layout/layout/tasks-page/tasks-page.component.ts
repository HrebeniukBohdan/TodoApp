import { Router } from '@angular/router';
import { TaskService } from '@main-layout/service/task.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITaskData } from '@main-layout/model/tasks.model';

@Component({
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPageComponent implements OnInit {

  public tasks$: Observable<ITaskData[]>;

  constructor(private tasksService: TaskService, private router: Router) { }

  public ngOnInit(): void {
    this.tasks$ = this.tasksService.tasks$;
    this.fetch();
  }

  public fetch(): void {
    this.tasksService.fetchTasks().subscribe();
  }

  public gotoEditScreen(task: ITaskData): void {
    this.router.navigate(['one', task.id]);
  }

  public changeTaskStatus(task: ITaskData): void {
    this.tasksService.changeTaskStatus(task).subscribe();
  }

}
