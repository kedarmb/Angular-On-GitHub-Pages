import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tender-fast-list',
  templateUrl: './tender-fast-list.component.html',
  styleUrls: ['./tender-fast-list.component.scss']
})
export class TenderFastListComponent implements OnInit {
  notifiedSubIds = [];
  notifiedSubList = [];
  tenderID: any;
  tenderData: any;
  selectedSub: any;
  attendedSubs = [];
  tender: any;
  _sub: any;
  createdSubline: any;
  nfSl = [];
  subList: any = [];
  _getSubStatus: any;
  _getTenderByID: any;
  subStatus: any = [];

  constructor(
    private router: Router,
    private hs: HelperService,
    private httpService: HttpService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.tenderID = JSON.parse(this.hs.getSession('tenderIdNow'));
    this._getTenderByID = this.httpService.getTenderDetailById(this.tenderID);
    this._getSubStatus = this.httpService.getSubStatus(this.tenderID);
    this.createSubList();
  }

  ngOnInit() {
    this.getSubline(); 
  }

  // getTenderByID() {
  //   this.spinner.show();
  //   this.httpService.getTenderDetailById(this.tenderID).subscribe(
  //     response => {
  //       if (response.status === 200) {
  //         this.spinner.hide();
  //         this.nfSl = response.body['headerLevelNotifiedSubs'];
  //         this.modifyNotifiedSubList();
  //         this.tenderData = response.body;
  //         this.hs.setSession('tenderDataNow', JSON.stringify(this.tenderData));
  //         this.notifiedSubIds = JSON.parse(this.hs.getSession('tenderDataNow'))['headerLevelNotifiedSubs'];
  //       }
  //     },
  //     err => {
  //       this.spinner.hide();
  //       console.log('Error getting Tender by id ', err);
  //     }
  //   );
  // }

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

  subSelection(e) {
    this.selectedSub = e;
    this._sub = e;
  }

  createSub(id) {
    //this.spinner.show();
    this.router.navigate(['/fast-quote/' + this.tenderID + '/' + id]);
    this.hs.setSession('subConIdNow', JSON.stringify(id));
  }

  getSubline() {
    this.spinner.show();
    this.httpService.getSubline(this.tenderID).subscribe(
      (response: any) => {
        this.spinner.hide();
        if (response.status === 201) {
          this.filterAttendedSub(response.body);
          this.createdSubline = response.body;
          this.hs.setSession('sublineDataNow', JSON.stringify(this.createdSubline));
          return response.body;
        }
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error.error.message);
      }
    );
  }
  filterAttendedSub(e) {
    this.attendedSubs = this.hs.unique(e);
  }

  compare() {
    this.router.navigate(['/fast-compare/' + this.tenderID], {
      state: this.tenderID
    });
  }

  cancel() {
    this.router.navigate(['/tender']);
  }
  createSubList() {
    this.spinner.show();
    forkJoin([this._getTenderByID, this._getSubStatus]).subscribe(response => {
      if (response) {
        if (response[0]['status'] === 200) {
          this.spinner.hide();
          this.nfSl = response[0]['body']['headerLevelNotifiedSubs'];
          this.modifyNotifiedSubList();
          this.tenderData = response[0]['body'];
          this.hs.setSession('tenderDataNow', JSON.stringify(this.tenderData));
          this.notifiedSubIds = JSON.parse(this.hs.getSession('tenderDataNow'))['headerLevelNotifiedSubs'];
        }
        if (response[1]['status'] === 201) {
          this.spinner.hide();
          this.subStatus = response[1]['body'] as Array<any>;
        }
      }
      this.notifiedSubIds.map(val => {
        for (let i in this.subStatus[0].headerLevelNotifiedSubs) {
          if (val == this.subStatus[0].headerLevelNotifiedSubs[i]['_id']) {
            const final = {
              _id: val,
              status: this.subStatus[0].headerLevelNotifiedSubs[i].received,
              lineItemCount: this.subStatus[0].headerLevelNotifiedSubs[i].lineItemCount
            };
            this.subList.push(final);
          }
        }
      });
    }),
      err => {
        this.spinner.hide();
        console.log('Error getting Tender by id ', err);
      };
  }
}
