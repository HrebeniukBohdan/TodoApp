import { Observable, BehaviorSubject, of } from 'rxjs';
import { API_SERVICE, IApiService } from '../../shared/service/api.service';
import { Injectable, Inject } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { ServiceType } from 'src/app/core/enum/enum';

export type TaskPriority = 'low'|'medium'|'high';

export interface ITaskData extends ITaskCreationalData {
  id: number;
  creationDate: Date;
  completed: boolean;
}

export interface ITaskRawData extends ITaskCreationalData {
  id: number;
  creationDate: string;
  completed: boolean;
}

export interface ITaskCreationalData {
  title: string;
  desc: string;
  proirity: TaskPriority;
}

export interface ISerializable<T> {
  serialize(): T;
}

export interface IDeserializable<R, T> {
  deserialize(rawData: R): T;
}

export interface IClonable<T> {
  clone(): T;
}

export class TaskData implements ITaskData, IClonable<TaskData>, IDeserializable<ITaskRawData, TaskData> {

  public id: number;
  public creationDate: Date;
  public completed: boolean;
  public title: string;
  public desc: string;
  public proirity: TaskPriority;

  constructor() {}

  deserialize(rawData: ITaskRawData): TaskData {
    this.id = rawData.id;
    this.creationDate = new Date(rawData.creationDate);
    this.completed = rawData.completed;
    this.title = rawData.title;
    this.desc = rawData.desc;
    this.proirity = rawData.proirity;
    return this;
  }

  clone(): TaskData {
    const copy = new TaskData();
    copy.id = this.id;
    copy.creationDate = this.creationDate;
    copy.completed = this.completed;
    copy.title = this.title;
    copy.desc = this.desc;
    copy.proirity = this.proirity;
    return copy;
  }
}

type ClassDef<T> = new(...args: any[]) => T;

/*export function deserialize<R, T>(classDef: ClassDef<T extends IDeserializable<R, T>>) {
  return (source: Observable<R>) => {
      return source.pipe(
        map(rawData => rawData)
      );
  };
}*/

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
    return this.api.get<ITaskRawData[]>(ServiceType.TASK, 'tasks').pipe(
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
