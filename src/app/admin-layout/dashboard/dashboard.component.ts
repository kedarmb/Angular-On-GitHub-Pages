
import { Component, OnInit } from '@angular/core';
import { TenderService } from '../../shared/core/service/tender.service';
import { Tender } from '../../shared/core/model/tender.model';
import {Dboard} from './dashboard';
// import { DashboardServiceService } from '../dashboard/dashboard.service';
import { HttpService } from '../../shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // mess: string;
  // mess = {};

  public tender_events = [];
  // public tender_events: any = {
  //   start: '',
  //   end:  '',
  //   title: '',
  //   allDay: true,
  //   resizable: {
  //     beforeStart: true,
  //     afterEnd: true
  //   },
  //   draggable: true
  // }

  tendersnew: any = [{}];
 
  dboard: Dboard = new Dboard();
  tenders: any = [{}];
  data: any = [{}];
  events = [];


  constructor( private tenderService: TenderService, private httpServ: HttpService,
              private hs: HelperService) {
  }
  ngOnInit() {
 
    // this.hs.currentMessage.subscribe(m => this.mess = m);

const l = [{ title: 'alish', start: '2019-12-24T18:30:00.000Z', end: '2019-12-30T18:30:00.000Z'},
   { title: 'amit', start: '2019-12-10T18:30:00.000Z', end: '2019-12-30T18:30:00.000Z'},
   { title: 'ankur', start: '2019-12-11T18:30:00.000Z', end: '2019-12-22T18:30:00.000Z'}
 ];

 const z = l.map(n => {
  const tender_even = {start: '',
  end:  '',
  title: '',
  allDay: true,
  resizable: {
    beforeStart: true,
    afterEnd: true
  },
  draggable: true}
  tender_even.title = n.title;
  tender_even.start = n.start;
 tender_even.end = n.end;
 return tender_even
  })

console.log(z);
    this.getAllTenders();
   this.hs.getTenterEven(z);
  }

  getDiff(date1 , date2) {
    const d1: any = new Date(date1);
    const d2: any = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays);
    return diffDays;
  }

  getAllTenders() {
    /* this.httpServ.getTenders().subscribe((result) => {
    this.tenders = result.body as Array<any>;
    this.tendersnew = this.tenders.slice(0, 3);
    console.log('------------------', this.tendersnew)
    }, (err) => {
      console.log('err in fetching tender headers ', err);
    }) */
  }
}


