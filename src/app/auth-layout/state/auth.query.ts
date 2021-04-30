import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStore } from './auth.store';
import { Query } from '@datorama/akita';
import { AuthStateModel } from './auth.model';

@Injectable()
export class AuthQuery extends Query<AuthStateModel> {
  state$: Observable<AuthStateModel> = this.select();

  constructor(protected store: AuthStore) {
    super(store);
  }
}
