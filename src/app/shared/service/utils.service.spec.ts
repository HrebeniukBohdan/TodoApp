import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MessageDialogComponent } from '@shared/component/message-dialog/message-dialog.component';

describe('UtilsService', () => {
  let service: UtilsService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of(true)
    });

    const matDialogSpy = jasmine.createSpyObj('MatDialog', {
      open: dialogRefSpyObj
    });

    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    });

    service = TestBed.inject(UtilsService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
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
        expect(result).toBeTrue();
        done();
      });
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
    }
    const copy = service.deepCopy(original);

    expect(copy).not.toBe(original);
    expect(copy).toEqual(original);
    expect(copy.name).toBe(original.name);
    expect(copy.count).toBe(original.count);
    expect(copy.isReady).toBe(original.isReady);
  });
});
