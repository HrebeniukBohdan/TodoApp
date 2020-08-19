import { Params, Data } from '@angular/router';

export interface RouterState {
  state: ActiveRouteState;
  navigationId: number;
}

export interface ActiveRouteState {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

