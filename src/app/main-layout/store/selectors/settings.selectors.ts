import { selectMainState } from './main.selector';
import { createSelector } from '@ngrx/store';
import { MainLayoutState } from '../reducers/reducers';

export const selectSettingsState = createSelector(
  selectMainState,
  (state: MainLayoutState) => state.settings
);
