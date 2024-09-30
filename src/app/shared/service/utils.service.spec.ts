import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';
import { MatDialog } from '@angular/material/dialog';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UtilsService, MatDialog] });
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
