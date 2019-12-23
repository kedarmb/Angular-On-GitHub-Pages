import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: 'red' },
  { path: '/tender', title: 'Tender',  icon: 'dashboard', class: 'blue' },
    { path: '/quote', title: 'Quote',  icon: 'dashboard', class: '' },
  { path: '/compare', title: 'Compare',  icon: 'dashboard', class: 'red' },
    { path: '/bid', title: 'Bid',  icon: 'dashboard', class: 'blue' },
    { path: '/analytics', title: 'Analytics',  icon: 'dashboard', class: 'red' },
  { path: '/organization', title: 'Organization',  icon: 'dashboard', class: 'blue' },
  { path: '/user', title: 'User',  icon: 'dashboard', class: 'blue' },
{ path: '/crew', title: 'Crew',  icon: 'dashboard', class: 'blue' },
   { path: '/calculation', title: 'Calculation',  icon: 'dashboard', class: 'grey' },
   { path: '/prefrences', title: 'Prefrences',  icon: 'dashboard', class: 'blue' },
   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
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
