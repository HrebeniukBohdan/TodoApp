import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { ITaskData } from '@main-layout/model/tasks.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {

  @Input() data: ITaskData;

  @Output() changeState: EventEmitter<ITaskData> = new EventEmitter();
  @Output() editClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  public onCheckboxClick(): void {
    this.changeState.emit(this.data);
  }
}
