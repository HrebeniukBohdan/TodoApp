import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskPageComponent } from './task-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '@shared/service/utils.service';
import { TaskService } from '@main-layout/service/task.service';
import { BehaviorSubject } from 'rxjs';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: { params: new BehaviorSubject({ id: 'new' })} },
        { provide: TaskService, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: UtilsService, useValue:{} }
      ],
      declarations: [ TaskPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
