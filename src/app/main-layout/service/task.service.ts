import { ITaskRawData, ITaskCreationalData, ITaskData } from '@main-layout/model/tasks.model';
import { Observable } from 'rxjs';
import { API_SERVICE, IApiService } from '@shared/service/api.service';
import { Injectable, Inject } from '@angular/core';
import { ServiceType } from '@core/enum';

@Injectable()
export class TaskService {

  constructor(@Inject(API_SERVICE) private api: IApiService<ServiceType>) { }

  public fetchTasks(): Observable<ITaskRawData[]> {
    return this.api.get<ITaskRawData[]>(ServiceType.TASK, 'tasks');
  }

  public addNewTask(taskParams: ITaskCreationalData): Observable<ITaskRawData> {
    return this.api.post<ITaskRawData>(ServiceType.TASK, 'tasks', taskParams);
  }

  public editTask(task: ITaskData): Observable<ITaskRawData> {
    return this.api.patch<ITaskRawData>(ServiceType.TASK, `tasks/${task.id}`, task);
  }

  public changeTaskStatus({ id, completed }: ITaskData): Observable<ITaskRawData> {
    return this.api.patch<ITaskRawData>(ServiceType.TASK, `tasks/${id}`, { completed: !completed });
  }
}
