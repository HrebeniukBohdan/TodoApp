import { MainActionTypes } from './../actions/main.actions';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class MainEffects {

  @Effect({ dispatch: false })
  goBack$: Observable<never>  = this.actions$.pipe(
    ofType(MainActionTypes.GoBack),
    tap(() => this.router.navigateByUrl('/'))
  );

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}
}
