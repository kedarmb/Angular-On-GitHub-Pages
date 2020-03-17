import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabGroup, MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  navLinks = [
    { path: 'login', label: 'Login' },
    { path: 'signUp', label: 'Sign Up' },
    { path: 'organization', label: 'Organization' }
  ];
  @ViewChild('tab', { static: false }) tabAuth: MatTabGroup;
  selected = new FormControl();
  constructor() {}
  change(e: MatTabChangeEvent) {
    console.log(e);
    if (e.index == 0) {
      console.log('one');
    }
    if (e.index == 1) {
      console.log('two');
    }
    if (e.index == 2) {
      console.log('three');
    }

    //  this.selected.setValue(this.selected.value)
    //  console.log(this.selected.value)
  }
  tabchange(val) {
    console.log(val);
    this.tabAuth.selectedIndex = val;
  }
  ngOnInit() {
    //this.authTab.selectedIndex= ;
  }
}
