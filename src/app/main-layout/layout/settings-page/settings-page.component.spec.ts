import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';

import { SettingsPageComponent } from './settings-page.component';
import { SettingsService } from '@main-layout/service/settings.service';
import { Router } from '@angular/router';
import { UtilsService } from '@shared/service/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        MatDialog,
        {
          provide: SettingsService,
          useValue: {
            fetchSettings: () => new BehaviorSubject([]).asObservable(),
          },
        },
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
        { provide: Router, useValue: {} },
        { provide: UtilsService, useValue: {} },
      ],
      declarations: [SettingsPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
