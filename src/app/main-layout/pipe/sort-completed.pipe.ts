import { ITaskData } from '@main-layout/model/tasks.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortCompleted',
  pure: true
})
export class SortCompletedPipe implements PipeTransform {

  transform(tasks: ITaskData[]|null, ...args: unknown[]): ITaskData[]|null {
    return tasks ? [...tasks].sort((a, b) => {
      if (a.completed && !b.completed) { return 1; }
      if (!a.completed && b.completed) { return -1; }
      return 0;
    }) : null;
  }

}
