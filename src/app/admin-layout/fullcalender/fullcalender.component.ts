
import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-fullcalender',
  templateUrl: './fullcalender.component.html',
  styleUrls: ['./fullcalender.component.scss']
})
export class FullcalenderComponent implements OnInit {
  calendarPlugins = [dayGridPlugin]; // important!
  
  constructor() { }

  ngOnInit() {
  }

}

