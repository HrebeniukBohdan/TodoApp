import { CanComponentDeactivate } from '@core/model/save-changes-guard.model';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class SaveChangesGuard  {

  constructor() {}

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }

}
