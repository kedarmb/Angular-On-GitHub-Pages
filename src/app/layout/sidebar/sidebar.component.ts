import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    img:string;
    comimgsoon:boolean;
}
// export const ROUTES: RouteInfo[] = [
//   { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: 'red', img: 'https://img.icons8.com/wired/64/000000/dashboard.png' },
//   { path: '/tender', title: 'Tender',  icon: 'dashboard',  class: 'blue', img: 'https://img.icons8.com/wired/64/000000/paper.png' },
//     { path: '/quote', title: 'Quote',  icon: 'dashboard', class: '', img: 'https://img.icons8.com/android/30/000000/money-bag.png' },
//   { path: '/compare', title: 'Compare',  icon: 'compare',  class: 'red', img: 'https://img.icons8.com/ios-glyphs/30/000000/compare-git.png' },
//     { path: '/bid', title: 'Bid',  icon: 'dashboard', class: 'blue', img: 'https://img.icons8.com/wired/64/000000/auction.png' },
//     { path: '/analytics', title: 'Analytics',  icon: 'dashboard',  class: 'red', img: 'https://img.icons8.com/pastel-glyph/64/000000/combo-chart.png' },
//   { path: '/organization', title: 'Organization',  icon: 'dashboard',  class: 'blue', img: 'https://img.icons8.com/material-sharp/24/000000/organization-chart-people.png' },
//   { path: '/user', title: 'User',  icon: 'person_add', class: 'blue', img: 'https://img.icons8.com/pastel-glyph/64/000000/user-male--v1.png' },
// { path: '/crew', title: 'Crew',  icon: 'people_alt',  class: 'blue', img: 'https://img.icons8.com/metro/26/000000/fireman-male.png'},
//    { path: '/calculation', title: 'Calculation',  icon: '', class: 'grey', img: 'https://img.icons8.com/pastel-glyph/64/000000/calculator.png' },
//    { path: '/prefrences', title: 'Prefrences',   icon: 'dashboard', class: 'pref',  img: 'https://img.icons8.com/material-two-tone/24/000000/details.png'},
// ];
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', comimgsoon: false, icon: 'dashboard', class: 'red', img: 'https://img.icons8.com/wired/64/000000/dashboard.png' },
  { path: '/tender', title: 'Tender',  icon: 'dashboard', comimgsoon: false, class: 'blue', img: 'https://img.icons8.com/wired/64/000000/paper.png' },
    { path: '/quote', title: 'Quote',  icon: 'dashboard', comimgsoon: false, class: '', img: 'https://img.icons8.com/android/30/000000/money-bag.png' },
  { path: '/compare', title: 'Compare',  icon: 'compare', comimgsoon: false , class: 'red', img: 'https://img.icons8.com/ios-glyphs/30/000000/compare-git.png' },
    { path: '/bid', title: 'Bid',  icon: 'dashboard', comimgsoon: false, class: 'blue', img: 'https://img.icons8.com/wired/64/000000/auction.png' },
    { path: '/analytics', title: 'Analytics',  icon: 'dashboard', comimgsoon: false, class: 'red', img: 'https://img.icons8.com/pastel-glyph/64/000000/combo-chart.png' },
  { path: '/organization', title: 'Organization',  icon: 'dashboard', comimgsoon: false, class: 'blue', img: 'https://img.icons8.com/material-sharp/24/000000/organization-chart-people.png' },
  { path: '/user', title: 'User',  icon: 'person_add', comimgsoon: false, class: 'blue', img: 'https://img.icons8.com/pastel-glyph/64/000000/user-male--v1.png' },
{ path: '/crew', title: 'Crew',  icon: 'people_alt',  comimgsoon: false, class: 'blue', img: 'https://img.icons8.com/metro/26/000000/fireman-male.png'},
   { path: '/calculation', title: 'Calculation',  icon: '', class: 'grey', comimgsoon: false, img: 'https://img.icons8.com/pastel-glyph/64/000000/calculator.png' },
   { path: '/preferences', title: 'preferences',   icon: 'dashboard', class: 'pref', comimgsoon: true, img: 'https://img.icons8.com/material-two-tone/24/000000/details.png'},
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
    console.log('sssss' , this.getComingSoon(ROUTES));
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  getComingSoon(ROUTES) {
    if (ROUTES.comingsoon === 'false') {
      return false;

    } else {
   return 'COMING SOON';
    }

  }
}
