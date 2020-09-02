import { Component, OnInit } from '@angular/core';
import { MenuRouteData } from '@main-layout/model/menu.model';
import { Store } from '@ngrx/store';
import { SignOut } from '@auth-layout/store/actions';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public menuItems: MenuRouteData[] = [
    { title: 'Tasks', icon: 'view_list', routerLink: 'tasks' },
    { title: 'Settings', icon: 'settings', routerLink: 'settings' }
  ];

  constructor(private readonly store: Store) { }

  public logOut(): void {
    this.store.dispatch(new SignOut());
  }

}
