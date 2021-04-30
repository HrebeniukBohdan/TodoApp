import { MenuRouteData } from '@main-layout/model/menu.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

const initialState = [
  { title: 'Tasks', icon: 'view_list', routerLink: 'tasks' },
  { title: 'Settings', icon: 'settings', routerLink: 'settings' }
];

@StoreConfig({ name: 'main' })
@Injectable()
export class MainStore extends Store<MenuRouteData[]>  {
  constructor() {
    super(initialState);
  }
}
