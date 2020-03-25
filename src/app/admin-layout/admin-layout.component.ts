import { Component, OnInit, AfterViewInit, HostListener, Inject, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Location, PopStateEvent, DOCUMENT } from '@angular/common';
import 'rxjs/add/operator/filter';
import * as $ from 'jquery';
import { HelperService } from 'app/shared/core/service/helper.service';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatToolbar, MatSidenavContainer } from '@angular/material';
import { CdkScrollable } from '@angular/cdk/overlay';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  pages = new Array(10);
  showToolBar = false;
  // @ViewChild('topnav', { static: false }) topnav: ElementRef;
  @ViewChild(MatSidenavContainer, { static: false }) sidenavContainer: MatSidenavContainer;
  @ViewChild('topnav', { static: false }) scrollable: CdkScrollable;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public location: Location,
    public hs: HelperService,
    @Inject(DOCUMENT) document,
    public renderer: Renderer2
  ) {}

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(this.sidenavContainer.scrollable.elementScrolled().subscribe(scrolled => console.log('scrolled', scrolled)));
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    // console.log(e);
    // console.log(this.topnav);
    if (window.pageYOffset > 550) {
      // this.showToolBar = false;
      // console.log(this.showToolBar);
    } else {
      // this.showToolBar = true;
      // console.log(this.showToolBar);
      // this.topnav.nativeElement.hidden = false;
      // this.topnav.nativeElement.remove('sticky');
      // let element = document.getElementById('navbar');
      // element.classList.remove('sticky');
    }
  }
  // @HostListener('scroll', ['$event'])
  // onScroll(event) {
  //   console.log('scrolling');
  // }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
}
