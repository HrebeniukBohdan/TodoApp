import { Params, Data } from '@angular/router';

export interface RouterStateModel {
  state: ActiveRouteStateModel;
  navigationId: number;
}

export interface ActiveRouteStateModel {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

