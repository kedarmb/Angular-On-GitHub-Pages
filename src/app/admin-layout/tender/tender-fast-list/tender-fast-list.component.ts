import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private hs: HelperService, private httpService: HttpService, 
    private toastr: ToastrService) {
    this.tender = this.router.getCurrentNavigation().extras.state;
      console.log(this.tender)
   }

  ngOnInit() {
    this.getTenderByID();
    this.createSubline();
    // this.router.events
    //   .subscribe((event: NavigationStart) => {
    //     if (event.navigationTrigger === 'popstate') {
    //       // Perform actions
    //       this.router.navigate(['/tender'])
    //       console.log(event);
    //     }
    //   });
  }

  getTenderByID() {
    // console.log('getTenderByID invoked ');
    this.httpService.getTenderDetailById(this.tender.tender._id).subscribe((response) => {
      // console.log('success getTenderDetailById ', response);
      if (response.status === 200) {
        // console.log('success getTenderDetailById ', response.status);
        this.hs.updateLocalTenderListByID(response.body);
        this.notifiedSubIds = response.body['headerLevelNotifiedSubs'];
        this.modifyNotifiedSubList();
        this.tenderData = response.body;
      }
    },
      (err) => {
        console.log('Error getting Tender by id ', err);
      })
  }

  private modifyNotifiedSubList() {
    if (this.notifiedSubIds.length <= 0) {
      return;
    }
    const subContList = this.hs.getSubContractorList();
    console.log(subContList);

    this.notifiedSubList = [];
    this.notifiedSubIds.forEach(element => {
      const sc = subContList.find(item => item._id === element);
      console.log('sc is: ', sc);
      this.notifiedSubList.push(sc);
    });
    this.notifiedSubIds = [];
    console.log('notifiedSubList  ', this.notifiedSubList);
  }

  subSelection(e) {
    this.selectedSub = e
    this._sub = e
  }

  createSub(id) {
    this.router.navigate(['/fast-quote/' + this.tender.tender._id + '/' + id._id], { state: { sub: this.createdSubline, tenderId: this.tender.tender._id, subId: id._id}});
  }

  createSubline() {
    this.httpService.getSubline(this.tender.tender._id)
      .subscribe((response: any) => {
        if (response.status === 201) {
          console.log(response.body)
          this.filterAttendedSub(response.body)
          this.toastr.success(response.statusText)
          this.createdSubline = response.body
        }
      },
        error => {
          this.toastr.error(error.error.message)
        }
      )
  }

  filterAttendedSub(e) {
    e.map((val) => {
      this.attendedSubs.push(val)
    })

  }
}
