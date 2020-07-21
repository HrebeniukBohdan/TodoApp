import { UtilsService } from '@shared/service/utils.service';
import { Router } from '@angular/router';
import { SettingsService } from '@main-layout/service/settings.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ISettings } from '@main-layout/model/settings.model';

interface IDisplayParameter {
  name: string;
  key: string;
}

@Component({
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent implements OnInit {

  public modes: IDisplayParameter[] = [
    { name: 'mode #1', key: 'mode0' },
    { name: 'mode #2', key: 'mode1' },
    { name: 'mode #3', key: 'mode2' },
    { name: 'mode #4', key: 'mode3' }
  ];

  public parameters: IDisplayParameter[] = [
    { name: 'parameter #1', key: 'param0' },
    { name: 'parameter #2', key: 'param1' },
    { name: 'parameter #3', key: 'param2' },
    { name: 'parameter #4', key: 'param3' },
    { name: 'parameter #5', key: 'param4' },
    { name: 'parameter #6', key: 'param5' }
  ];

  public settings: ISettings;

  constructor(
    private settingsService: SettingsService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.settingsService.fetchSettings()
    .subscribe(settings => {
      this.settings = this.utilsService.deepCopy(settings);
      this.cdRef.markForCheck();
    });
  }

  public save(): void {
    this.settingsService.changeSettings(this.settings).subscribe(
      () => this.router.navigateByUrl('/')
    );
  }

  public goBack(): void {
    this.router.navigateByUrl('/');
  }
}
