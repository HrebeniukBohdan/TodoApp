import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MessageDialogComponent } from './message-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('MessageDialogComponent', () => {
  let component: MessageDialogComponent;
  let fixture: ComponentFixture<MessageDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<MessageDialogComponent>>;

  beforeEach(waitForAsync(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef<MessageDialogComponent>, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      declarations: [ MessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with a reason when close is called', () => {
    component.close(true);
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
