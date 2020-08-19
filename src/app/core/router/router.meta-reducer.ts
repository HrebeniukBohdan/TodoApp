import { ActionReducer } from '@ngrx/store';
import { ROUTER_NAVIGATION, ROUTER_ERROR, ROUTER_CANCEL } from '@ngrx/router-store';

interface AppState {
  router: any;
}

export function fixRouterStoreCancel(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  let preCancelState;
  return (state: AppState, action: any): AppState => {
    let currentAction = action;
    if (state && state.router && action.type === ROUTER_NAVIGATION) {
      preCancelState = state.router.state;
    }
    if (action.type === ROUTER_CANCEL || action.type === ROUTER_ERROR) {
      currentAction = {
        ...action,
        payload: {
          ...action.payload,
          routerState: preCancelState
        }
      };
    }
    return reducer(state, currentAction);
  };
}
