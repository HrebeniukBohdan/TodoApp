import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export enum MessageBoxType {
  Error,
  Success,
  Warning,
  Note
}

interface IMessageBoxConf {
  icon: string;
  style: string;
}

const CONFIGS: IMessageBoxConf[] = [
  { icon: 'highlight_off', style: 'error' },
  { icon: 'check_circle', style: 'success' },
  { icon: 'error', style: 'warning' },
  { icon: 'info', style: 'note' }
];

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {
  @Output() closeClick: EventEmitter<void> = new EventEmitter();
  @Input() set type(value: MessageBoxType) {
    this.config = CONFIGS[value];
  }

  public config: IMessageBoxConf;

  constructor() {
    this.type = MessageBoxType.Error;
  }
}
