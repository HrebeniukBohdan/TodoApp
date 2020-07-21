import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  animations: [
    trigger('appearTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms 1s', style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class LoadingScreenComponent {

  @Input() fullScreen: boolean = false;
  @Input() showProgressBar: boolean = false;

  constructor() { }
}
