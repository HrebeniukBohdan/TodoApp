import { RouterStateModel } from '../../model/router.model';
import { createFeatureSelector } from '@ngrx/store';

export const selectActiveRoute = createFeatureSelector<RouterStateModel>('router');
