import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ITaskData } from '../../service/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  @Input() data: ITaskData;

  @Output() changeState: EventEmitter<ITaskData> = new EventEmitter();
  @Output() editClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  public onCheckboxClick(event: Event): void {
    event.preventDefault();
    this.changeState.emit(this.data);
  }

}
