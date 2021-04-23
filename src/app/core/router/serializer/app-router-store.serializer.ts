import { RouterStateSnapshot } from '@angular/router';
import { ActiveRouteStateModel } from '../../model/router.model';
import { RouterStateSerializer } from '@ngxs/router-plugin';

// Map the router snapshot to { url, params, queryParams }
export class AppRouterStateSerializer implements RouterStateSerializer<ActiveRouteStateModel> {
  serialize(state: RouterStateSnapshot): ActiveRouteStateModel {
    let currentRoute = state.root;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const { url, root: { queryParams } } = state;
    const { params, data } = currentRoute;

    return { url, params, queryParams, data };
  }
}
