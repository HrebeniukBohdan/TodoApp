import { Component, Input } from '@angular/core';

export interface MenuRouteData {
  title: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() menuItems: MenuRouteData[];

  constructor() { }
}
