import { TaskData, ITaskRawData, ITaskCreationalData, ITaskData } from '@main-layout/model/tasks.model';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { API_SERVICE, IApiService } from '@shared/service/api.service';
import { Injectable, Inject } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { ServiceType } from '@core/enum';

@Injectable()
export class TaskService {

  private tasksSubject: BehaviorSubject<TaskData[]|null> = new BehaviorSubject<TaskData[]|null>(null);

  constructor(@Inject(API_SERVICE) private api: IApiService<ServiceType>) { }

  public get tasks$(): Observable<TaskData[]> {
    return this.tasksSubject.asObservable();
  }

  public get tasks(): TaskData[] {
    return this.tasksSubject.getValue();
  }

  public fetchTasks(): Observable<TaskData[]> {
    return this.tasks ? of([...this.tasks]) :
    this.api.get<ITaskRawData[]>(ServiceType.TASK, 'tasks').pipe(
      map(tasksRaw => tasksRaw.map(raw => new TaskData().deserialize(raw))),
      tap(tasks => this.tasksSubject.next(tasks))
    );
  }

  public addNewTask(taskParams: ITaskCreationalData): Observable<TaskData> {
    return this.api.post<ITaskRawData>(ServiceType.TASK, 'tasks', taskParams).pipe(
      map(taskRaw => new TaskData().deserialize(taskRaw)),
      tap(task => this.tasksSubject.next([...this.tasks, task]))
    );
  }

  public editTask(task: ITaskData): Observable<TaskData> {
    return this.api.patch<ITaskRawData>(ServiceType.TASK, `tasks/${task.id}`, task).pipe(
      map(taskRaw => new TaskData().deserialize(taskRaw))
    );
  }

  public changeTaskStatus({ id, completed }: ITaskData): Observable<TaskData> {
    return this.api.patch<ITaskRawData>(ServiceType.TASK, `tasks/${id}`, { completed: !completed }).pipe(
      map(taskRaw => new TaskData().deserialize(taskRaw)),
      tap(task => this.tasksSubject.next(this.replaceTaskAndCopy(this.tasks, task)))
    );
  }

  public getTask(id: number): Observable<TaskData> {
    const cachedTask = this.tasks.find(task => task.id === id);
    return cachedTask ? of(cachedTask) :
    this.api.get<ITaskRawData>(ServiceType.TASK, `tasks/${id}`).pipe(
      map(taskRaw => new TaskData().deserialize(taskRaw))
    );
  }

  public getNewTaskData(): Observable<ITaskCreationalData> {
    return of({
      title: '',
      desc: '',
      proirity: 'low'
    });
  }

  private replaceTaskAndCopy(tasks: TaskData[], updatedTask: TaskData): TaskData[] {
    const copy = [...tasks];
    copy[tasks.findIndex(task => task.id === updatedTask.id)] = updatedTask;
    return copy;
  }
}
