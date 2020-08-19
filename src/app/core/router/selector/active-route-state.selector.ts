import { RouterState } from '../../model/router.model';
import { createFeatureSelector } from '@ngrx/store';

export const selectActiveRoute = createFeatureSelector<RouterState>('router');
