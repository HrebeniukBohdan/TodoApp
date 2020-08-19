import { ActiveRouteState } from '../../model/router.model';
import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export class AppSerializer implements RouterStateSerializer<ActiveRouteState> {
  serialize(state: RouterStateSnapshot): ActiveRouteState {
    let currentRoute = state.root;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const { url, root: { queryParams } } = state;
    const { params, data } = currentRoute;

    return { url, params, queryParams, data };
  }
}
