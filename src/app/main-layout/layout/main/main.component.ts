import { MenuRouteData } from './../../component/menu/menu.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public menuItems: MenuRouteData[] = [
    { title: 'Tasks', icon: 'view_list', routerLink: 'tasks' },
    { title: 'Settings', icon: 'settings', routerLink: 'settings' }
  ];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  public logOut(): void {
    this.authService.signOut();
    this.router.navigateByUrl('/sign-in');
  }

}
