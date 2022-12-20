import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
const rol:string="";
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Tablero', icon: 'pe-7s-graph', class: '' },
  { path: '/usuarios', title: 'Usuarios', icon: 'pe-7s-user', class: '' },
  { path: '/usuario', title: 'Mi perfil', icon: 'pe-7s-user', class: '' },
  { path: '/placas', title: 'Placas', icon: 'pe-7s-car', class: '' },
  { path: '/reportes', title: 'Reportes', icon: 'pe-7s-display1', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService,  private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
