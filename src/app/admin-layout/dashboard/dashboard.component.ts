
import { Component, OnInit } from '@angular/core';
import { TenderService } from '../../shared/core/service/tender.service';
import { Dboard } from './dashboard';
import { HttpService } from '../../shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  feMsg: string;

  public tender_events = [];

  tendersnew: any = [{}];

  dboard: Dboard = new Dboard();
  tenders: any = [{}];
  data: any = [{}];
  events = [];
  // ++++++listofsc++++++++++++
  responseData: any;
  tenderID: any;
  notifiedSubList: any;
  notifiedSubIds = [];    // for temporarily storing heder level notified subs IDS
  // ++++++listofsc++++++++++++
  constructor(private tenderService: TenderService, private httpServ: HttpService,
    private hs: HelperService, private spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
       // ++++++listofsc++++++++++++
      this.activatedRoute.params.subscribe((params) => {
        const paramData = window.history.state;
        this.tenderID = paramData._id;
        this.notifiedSubIds = paramData['headerLevelNotifiedSubs'];
        this.modifyNotifiedSubList();
        return;
    })
  }

  // ++++++listofsc++++++++++++

  ngOnInit() {

    this.spinner.show();
    const l = [{ TenderName: 'alish', QuoteStart: '2019-12-24T18:30:00.000Z', QuoteEnd: '2019-12-30T18:30:00.000Z' },
    { TenderName: 'amit', QuoteStart: '2019-12-10T18:30:00.000Z', QuoteEnd: '2019-12-30T18:30:00.000Z' },
    { TenderName: 'ankur', QuoteStart: '2019-12-11T18:30:00.000Z', QuoteEnd: '2019-12-22T18:30:00.000Z' }
    ];

    const z = l.map(n => {
      const tender_even = {
        start: '',
        end: '',
        TenderName: '',
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      }
      tender_even.TenderName = n.TenderName;
      tender_even.start = n.QuoteStart;
      tender_even.end = n.QuoteEnd;
      return tender_even
    })

    this.getAllTenders();
    this.hs.getTenterEven(z);
  }

  getDiff(date1, date2) {
    const d1: any = new Date(date1);
    const d2: any = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  // ++++++listofsc++++++++++++
  private modifyNotifiedSubList() {
    if (this.notifiedSubIds.length <= 0) {
      return;
    }
    const subContList = this.hs.getSubContractorList();
    this.notifiedSubList = [];
    this.notifiedSubIds.forEach(element => {
      const sc = subContList.find(item => item._id === element);
      this.notifiedSubList.push(sc);
    });
    this.notifiedSubIds = [];
}
 // ++++++listofsc++++++++++++
 getTenderByID() {
  this.httpServ.getTenderDetailById(this.tenderID).subscribe((response) => {
      if (response.status === 200) {
          this.hs.updateLocalTenderListByID(response.body);
          this.notifiedSubIds = response.body['headerLevelNotifiedSubs'];
          this.modifyNotifiedSubList();
          this.responseData = response.body;
          this.toastr.success('Selected Sub Contractors have been notified.');
      }
    },
      (err) => {
        console.log('Error getting Tender by id ', err);
      })
  }
  // ++++++listofsc++++++++++++
  getAllTenders() {
    this.feMsg = 'Loading your list of tenders..'
    const appendStr = '/0/0';
    this.httpServ.getTenders(appendStr).subscribe((result) => {
      this.tenders = result.body as Array<any>;
      this.tendersnew = this.tenders.slice(0, 3);
      if (this.tenders.length < 1) {
        this.feMsg = 'You do not have any listed tender now..'
      }
      //
      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
    })
  }
}


