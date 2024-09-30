import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TasksPageComponent } from './tasks-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '@main-layout/service/task.service';
import { ITaskData } from '@main-layout/model/tasks.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortCompletedPipe } from '@main-layout/pipe/sort-completed.pipe';

describe('TasksPageComponent', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;
  const tasks: ITaskData[] = [
    {
      id: 1,
      creationDate: new Date(),
      completed: false,
      title: 'my task',
      desc: 'my task descr',
      proirity: 'low',
    },
    {
      id: 2,
      creationDate: new Date(),
      completed: true,
      title: 'my new task',
      desc: 'my new task descr',
      proirity: 'medium',
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TaskService, useValue: { 
            tasks$: new BehaviorSubject(tasks),
            fetchTasks: () => new Observable(),
          } 
        },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} },
      ],
      declarations: [
        TasksPageComponent,
        SortCompletedPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
