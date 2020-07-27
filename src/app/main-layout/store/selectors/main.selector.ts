import { createFeatureSelector } from '@ngrx/store';
import { mainFeatureKey, MainLayoutState } from '../reducers/reducers';

export const selectMainState = createFeatureSelector<MainLayoutState>(mainFeatureKey);
