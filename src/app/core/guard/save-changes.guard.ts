import { CanComponentDeactivate } from '@core/model/save-changes-guard.model';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class SaveChangesGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor() {}

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }

}
