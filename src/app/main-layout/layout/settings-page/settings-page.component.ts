import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  currentMode: string;
  modes: string[] = ['mode #1', 'mode #2', 'mode #3', 'mode #4'];

  parameters: string[] = ['parameter1', 'parameter2', 'parameter3', 'parameter4', 'parameter5', 'parameter6'];

  constructor() { }

  ngOnInit(): void {
  }

}
