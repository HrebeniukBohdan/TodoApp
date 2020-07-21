import { MenuRouteData } from '@main-layout/model/menu.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() menuItems: MenuRouteData[];

  constructor() { }
}
