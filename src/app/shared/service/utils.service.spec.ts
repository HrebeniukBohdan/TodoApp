import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { UtilsService } from './utils.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MessageDialogComponent } from '@shared/component/message-dialog/message-dialog.component';

describe('UtilsService', () => {
  let spectator: SpectatorService<UtilsService>;
  let service: UtilsService;
  let dialogSpy: jest.Mocked<MatDialog>;

  const createService = createServiceFactory({
    service: UtilsService,
    mocks: [MatDialog]
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    dialogSpy = spectator.inject(MatDialog) as jest.Mocked<MatDialog>;
    dialogSpy.open.mockReturnValue({
      afterClosed: () => of(true)
    } as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showMessage', () => {
    it('should open the dialog with correct parameters', () => {
      service.showMessage(false, 'Test Title', 'Test Message', true);

      expect(dialogSpy.open).toHaveBeenCalledWith(MessageDialogComponent, {
        data: {
          type: true,
          title: 'Test Title',
          message: 'Test Message',
          cancelButton: true
        },
        maxWidth: '100vw'
      });
    });

    it('should return an Observable when dialog is closed', (done) => {
      service.showMessage(true, 'Error Title', 'Error Message', false).subscribe(result => {
        expect(result).toBe(true);
        done();
      });
    });
  });

  it('should return a copy and each field must equal to its origin field', () => {
    const original = {
      name: 'Field name',
      count: 100,
      isReady: true,
      objField: {
        name: 'inner field name',
        age: 28
      },
      list: [
        'string', 10, null, true
      ]
    };
    const copy = service.deepCopy(original);

    expect(copy).not.toBe(original);
    expect(copy).toEqual(original);
    expect(copy.name).toBe(original.name);
    expect(copy.count).toBe(original.count);
    expect(copy.isReady).toBe(original.isReady);
  });
});
