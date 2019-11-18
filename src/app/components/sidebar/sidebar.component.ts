import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },


    { path: '/analytics', title: 'Analytics',  icon: 'dashboard', class: '' },
    { path: '/organization', title: 'Organization',  icon: 'dashboard', class: '' },
    { path: '/user', title: 'User',  icon: 'dashboard', class: '' },


    { path: '/crew', title: 'Crew',  icon: 'dashboard', class: '' },

    { path: '/tender', title: 'Tender',  icon: 'dashboard', class: '' },
    { path: '/calculation', title: 'Calculation',  icon: 'dashboard', class: '' },
    { path: '/labour', title: 'Labour',  icon: 'dashboard', class: '' },
    { path: '/settings', title: 'Settings',  icon: 'dashboard', class: '' },
     { path: '/quote', title: 'Quote',  icon: 'dashboard', class: '' }


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
