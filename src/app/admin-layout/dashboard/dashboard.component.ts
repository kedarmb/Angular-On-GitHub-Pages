
import { Component, OnInit } from '@angular/core';
import { TenderService } from '../../shared/core/service/tender.service';
import { Tender } from '../../shared/core/model/tender.model';
import {Dboard} from './dashboard';
// import { DashboardServiceService } from '../dashboard/dashboard.service';
import { HttpService } from '../../shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  feMsg: string;
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
    private hs: HelperService, private spinner: NgxSpinnerService) {
  }
  ngOnInit() {

    // this.hs.currentMessage.subscribe(m => this.mess = m);
    this.spinner.show();
const l = [{ TenderName: 'alish', QuoteStart: '2019-12-24T18:30:00.000Z', QuoteEnd: '2019-12-30T18:30:00.000Z'},
    { TenderName: 'amit', QuoteStart: '2019-12-10T18:30:00.000Z',  QuoteEnd: '2019-12-30T18:30:00.000Z'},
    { TenderName: 'ankur', QuoteStart: '2019-12-11T18:30:00.000Z',  QuoteEnd: '2019-12-22T18:30:00.000Z'}
  ];

  const z = l.map(n => {
  const tender_even = {start: '',
  end:  '',
  TenderName: '',
  allDay: true,
  resizable: {
    beforeStart: true,
    afterEnd: true
  },
  draggable: true}
      tender_even.TenderName = n.TenderName;
      tender_even.start = n.QuoteStart;
      tender_even.end = n. QuoteEnd;
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

  // getAllTenders() {
  //    this.httpServ.getTenders().subscribe((result) => {
  //   this.tenders = result.body as Array<any>;
  //   this.tendersnew = this.tenders.slice(0, 3);
  //   console.log('------------------', this.tendersnew)
  //   }, (err) => {
  //     console.log('err in fetching tender headers ', err);
  //   })
  // }

  getAllTenders() {
    this.feMsg = 'Loading your list of tenders..'
    const appendStr = '/0/0';
    // const appendStr = '/orgId/' + this.hs.getOrgId() + '/0/0';
    // console.log('appended string is ', appendStr);
    this.httpServ.getTenders(appendStr).subscribe((result) => {
      // console.log('success in fetching tender headers ', result);
      this.tenders = result.body as Array<any>;
      this.tendersnew = this.tenders.slice(0, 3);
      // this.tenders.splice(1);
      if (this.tenders.length < 1) {
        this.feMsg = 'You do not have any listed tender now..'
      }
      console.log(this.tenders);
      this.hs.setOrgList();
      this.hs.setEqupmentList();
      this.hs.setLabourList();
      //
      /* this.tenders.map(val => {
        // console.log('_id is .... ', val.clientName);
        const j = this.hs.findClientName(val.clientName);
        val.clientName = j;
      }) */
      //
      // this.hs.hideSpinner();
      this.spinner.hide();
    }, (err) => {
      console.log('err in fetching tender headers ', err);
      this.spinner.hide();
    })
  }
}


