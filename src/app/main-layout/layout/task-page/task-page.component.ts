import { UtilsService } from './../../../shared/service/utils.service';
import { CanComponentDeactivate } from './../../guard/save-changes.guard';
import { ITaskCreationalData, TaskData, TaskPriority } from './../../service/task.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { tap, switchMap, mapTo } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';

interface PriorityConfig {
  name: string;
  value: TaskPriority;
}

@Component({
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit, CanComponentDeactivate {

  public readonly priorityConfs: PriorityConfig[] = [
    { name: 'Low', value: 'low' },
    { name: 'Medium', value: 'medium' },
    { name: 'High', value: 'high' },
  ];
  public params: Params;
  public task: ITaskCreationalData|TaskData|null;
  public editMode: boolean = true;

  @ViewChild('formCtrl') form: NgForm;

  private taskId: number;
  private saveBtnPressed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TaskService,
    private router: Router,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.route.params.
    pipe(
      tap(params => {
        this.params = params;
        const id: string = params.id;
        if (id === 'new') {
          this.editMode = false;
        } else {
          this.taskId = parseInt(id, 10);
        }
      }),
      switchMap(() => this.editMode ?
                          this.tasksService.getTask(this.taskId) : this.tasksService.getNewTaskData())
    ).subscribe(task => this.task = task);
  }

  processTask(): void {
    this.saveBtnPressed = true;
    this.taskProcessingObs$.subscribe(() => this.router.navigateByUrl('/'));
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form && !this.saveBtnPressed && this.form.valid && this.form.dirty)
    {
        return this.utilsService.showMessage(
          false, 'Warning', [
            'The form contains some changes.',
            'Would you like to save the proggress?'
          ], true
        ).pipe(
          switchMap(save => save ? this.taskProcessingObs$ : of(true)),
          mapTo(true)
        );
    }
    return true;
  }

  private get taskProcessingObs$(): Observable<TaskData> {
    return this.editMode ?
      this.tasksService.editTask(this.task as TaskData) : this.tasksService.addNewTask(this.task);
  }

}
