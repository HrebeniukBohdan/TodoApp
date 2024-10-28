import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { MessageDialogComponent } from './message-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('MessageDialogComponent', () => {
  let spectator: Spectator<MessageDialogComponent>;
  let component: MessageDialogComponent;

  const createComponent = createComponentFactory({
    component: MessageDialogComponent,
    providers: [
      { provide: MatDialogRef, useValue: { close: jest.fn() } },
      { provide: MAT_DIALOG_DATA, useValue: {} },
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with a reason when close is called', () => {
    component.close(true);
    expect(spectator.inject(MatDialogRef).close).toHaveBeenCalledWith(true);
  });
});
