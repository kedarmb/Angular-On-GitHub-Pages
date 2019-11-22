import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: 'grey' },
    { path: '/tender', title: 'Tender',  icon: 'dashboard', class: 'grey' },
    { path: '/calculation', title: 'Calculation',  icon: 'dashboard', class: 'grey' },
    { path: '/analytics', title: 'Analytics',  icon: 'dashboard', class: 'blue' },
    { path: '/organization', title: 'Organization',  icon: 'dashboard', class: 'blue' },
    { path: '/user', title: 'User',  icon: 'dashboard', class: 'blue' },


    { path: '/crew', title: 'Crew',  icon: 'dashboard', class: 'blue' },
    { path: '/equipments', title: 'Equipments',  icon: 'dashboard', class: 'blue' },
    { path: '/labour', title: 'Labour',  icon: 'dashboard', class: 'blue' },

   
  
    // { path: '/labour', title: 'Labour',  icon: 'dashboard', class: '' },
    { path: '/settings', title: 'Settings',  icon: 'dashboard', class: 'blue' },
    //  { path: '/quote', title: 'Quote',  icon: 'dashboard', class: '' }


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
