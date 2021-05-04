import { MenuRouteData } from '@main-layout/model/menu.model';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

@State<MenuRouteData[]>({
  name: 'mainFeature',
  defaults: [
    { title: 'Tasks', icon: 'view_list', routerLink: 'tasks' },
    { title: 'Settings', icon: 'settings', routerLink: 'settings' }
  ]
})
@Injectable()
export class MainState {
  constructor() {}
}
