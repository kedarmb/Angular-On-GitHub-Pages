import { ToastrService } from "ngx-toastr";
import { HttpService } from "app/shared/core/service/http.service";
import { HelperService } from "app/shared/core/service/helper.service";
import { Router } from "@angular/router";
import { Component, OnInit, OnChanges } from "@angular/core";
import { PlatformLocation } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-tender-fast-list",
  templateUrl: "./tender-fast-list.component.html",
  styleUrls: ["./tender-fast-list.component.scss"]
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
  nfSl = [];

  constructor(
    private router: Router,
    private hs: HelperService,
    private httpService: HttpService,
    private toastr: ToastrService,
    private location: PlatformLocation,
    private spinner: NgxSpinnerService) {
    this.tenderID = JSON.parse(this.hs.getSession("tenderIdNow"));
    this.invitedSubs = this.tenderID;
    this.getTenderByID();
  }

  ngOnInit() {
    // this.hs.setDataInHelperSrv();
    this.getSubline();
  }

  getTenderByID() {
    this.spinner.show();
    console.log(this.tenderID);
    this.httpService.getTenderDetailById(this.tenderID).subscribe(
      response => {
        if (response.status === 200) {
          this.spinner.hide();
          // this.hs.updateLocalTenderListByID(response.body);
          
          this.notifiedSubIds = response.body["headerLevelNotifiedSubs"];
          console.log(this.notifiedSubIds);
          this.nfSl = response.body["headerLevelNotifiedSubs"];
          this.modifyNotifiedSubList();
          this.tenderData = response.body;
          this.hs.setSession("tenderDataNow", JSON.stringify(this.tenderData));
        }
      },
      err => {
        this.spinner.hide();
        console.log("Error getting Tender by id ", err);
      }
    );
  }

  private modifyNotifiedSubList() {
    if (this.notifiedSubIds.length <= 0) {
      console.log("returned .... ", this.notifiedSubIds);
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
    console.log(e);
  }

  createSub(id) {
    console.log(id._id);
    this.router.navigate(["/fast-quote/" + this.tenderID + "/" + id._id]);
    this.hs.setSession("subConIdNow", JSON.stringify(id._id));
  }

  getSubline() {
    this.spinner.show();
    this.httpService.getSubline(this.tenderID).subscribe(
      (response: any) => {
        this.spinner.hide();
        if (response.status === 201) {
          this.filterAttendedSub(response.body);
          this.createdSubline = response.body;
          this.hs.setSession(
            "sublineDataNow",
            JSON.stringify(this.createdSubline)
            );
          }
        },
        error => {
          this.spinner.hide();
        this.toastr.error(error.error.message);
      }
    );
  }

  filterAttendedSub(e) {
    const filterArr: any[] = [];
    console.log(e);
    
    
    this.attendedSubs = this.hs.unique(e);
  }

  compare() {
    this.router.navigate(["/fast-compare/" + this.tenderID], {
      state: this.tenderID
    });
  }

  cancel() {
    this.router.navigate(["/tender"]);
  }
}
