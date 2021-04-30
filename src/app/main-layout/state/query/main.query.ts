import { MainStore } from '@main-layout/state/store/main.store';
import { MenuRouteData } from '@main-layout/model/menu.model';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable()
export class MainQuery extends Query<MenuRouteData[]> {
  constructor(protected store: MainStore) {
    super(store);
  }
}
