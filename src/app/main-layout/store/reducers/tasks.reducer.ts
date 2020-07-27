import { Action } from '@ngrx/store';

export const tasksFeatureKey = 'tasks';

export interface TasksState {
  data: any;
}

export const initialState: TasksState = {
  data: null
};

export function reducer(state = initialState, action: Action): TasksState {
  switch (action.type) {

    default:
      return state;
  }
}
