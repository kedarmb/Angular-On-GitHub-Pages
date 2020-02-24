import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-tender-fast-list',
  templateUrl: './tender-fast-list.component.html',
  styleUrls: ['./tender-fast-list.component.scss']
})

export class TenderFastListComponent implements OnInit {
  notifiedSubIds = [];
  notifiedSubList: any;
  tenderID: any;
  tenderData: any;
  selectedSub: any;
  attendedSubs = [];
  tender: any;
  _sub: any;
  createdSubline: any;
  invitedSubs: any;


  constructor(private router: Router, private hs: HelperService,
    private httpService: HttpService, private toastr: ToastrService,
    private location: PlatformLocation) {
    // this.tender = this.router.getCurrentNavigation().extras.state;
    // this.notifiedSubIds = this.tender.headerLevelNotifiedSubs;

    this.tenderID = JSON.parse(this.hs.getSession('tenderIdNow'));
    this.invitedSubs = this.tenderID;
  };

  ngOnInit() {
    // this.hs.setDataInHelperSrv();
    this.getTenderByID();
    this.createSubline();
  };

  // ngOnChanges(): void {
  //   this.location.onPopState((e) => {
  //     if (e.type === 'popstate') {
  //       this.router.navigateByUrl('/tender');
  //     }
  //   });
  // };

  getTenderByID() {
    console.log(this.tenderID);
      this.httpService.getTenderDetailById(this.tenderID).subscribe((response) => {
      if (response.status === 200) {
        this.hs.updateLocalTenderListByID(response.body);
        this.notifiedSubIds = response.body['headerLevelNotifiedSubs'];
        this.modifyNotifiedSubList();
        this.tenderData = response.body;
        this.hs.setSession('tenderDataNow', JSON.stringify(this.tenderData));
      }
    },
      (err) => {
        console.log('Error getting Tender by id ', err);
      })
  };

  private modifyNotifiedSubList() {
    if (this.notifiedSubIds.length <= 0) {
      console.log('returned .... ', this.notifiedSubIds);
      return;
    };
    const subContList = this.hs.getSubContractorList();
    this.notifiedSubList = [];
    console.log(subContList );
    console.log(this.notifiedSubList);
    console.log(this.notifiedSubIds);
    this.notifiedSubIds.forEach(element => {
      const sc = subContList.find(item => item._id === element);
      this.notifiedSubList.push(sc);
    });
    this.notifiedSubIds = [];
  };

  subSelection(e) {
    this.selectedSub = e;
    this._sub = e;
  };

  createSub(id) {
    console.log(id._id)
    this.router.navigate(['/fast-quote/' + this.tenderID + '/' + id._id]);
    this.hs.setSession('subConIdNow', JSON.stringify(id._id));
  };


  createSubline() {
    this.httpService.getSubline(this.tenderID)
      .subscribe((response: any) => {
        if (response.status === 201) {
          this.filterAttendedSub(response.body);
          this.toastr.success(response.statusText);
          this.createdSubline = response.body;
          this.hs.setSession('sublineDataNow', JSON.stringify(this.createdSubline));
        }
      },
        error => {
          this.toastr.error(error.error.message);
        }
      )
  };

  filterAttendedSub(e) {
    const filterArr: any[] = [];
    e.map((val) => {
      filterArr.push(val);
    })
    this.attendedSubs = this.hs.unique(filterArr);
  };


  compare() {
    this.router.navigate(['/fast-compare/' + this.tenderID], { state: this.tenderID });
  }

  cancel() {
    this.router.navigate(['/tender']);
  }
};
