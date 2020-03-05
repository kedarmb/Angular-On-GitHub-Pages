import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "app/shared/core/service/helper.service";
import { HttpService } from "app/shared/core/service/http.service";
import { PlatformLocation } from "@angular/common";
import { MatDialog } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-tender-fast-attach",
  templateUrl: "./tender-fast-attach.component.html",
  styleUrls: ["./tender-fast-attach.component.scss"]
})
export class TenderFastAttachComponent implements OnInit {
  tenderId: any;
  sectionId: any;
  tenderData: any;
  selectedQuotes: Object;
  filteredSection: any;
  finalArr = [];
  selectedSection: any;
  ifSelectedLine = false;
  @ViewChildren("quo") vc: QueryList<any>;

  constructor(
    private router: Router,
    private hs: HelperService,
    private httpService: HttpService,
    public fastCompareDialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {this.tenderId = JSON.parse(this.hs.getSession("tenderIdNow"));}

  ngOnInit() {
    this.getTenderById();
    this.getSelectedSubline();
  }

  // call tender get API
  getTenderById() {
    this.spinner.show();
    this.httpService.getTenderDetailById(this.tenderId).subscribe(
      response => {
        this.spinner.hide();
        if (response.status === 200) {
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
  // call tenderpost api
  createSublineWithLine() {
    this.spinner.show();
    this.httpService
      .getseletedSubForLine(this.tenderId, this.finalArr)
      .subscribe(
        response => {
          this.spinner.hide();
          if (response.status === 200) {
          }
        },
        err => {
          console.log("Error getting Tender by id ", err);
          this.spinner.hide();
        }
      );
  }
  // call subline get API
  getSelectedSubline() {
    this.spinner.show();
    this.httpService.getselectedsubline(this.tenderId).subscribe(
      response => {
        this.spinner.hide();
        if (response.status === 201) {
          this.selectedQuotes = response.body;
        }
      },
      err => {
        this.spinner.hide();
        console.log("Error getting Tender by id ", err);
      }
    );
  }

  // filters section from dropdown.
  showSection(value, a) {
    this.filteredSection = this.tenderData.sections.filter(
      v => v._id === value
    );
    this.selectedSection = value;
  }

  // selects, add & remove lineitems and disables dropdown and enables subline to select.
  getSelectedLine(event, val, section) {
    console.log(event);
    this.sectionId = section;
    const k = {
      subLineItemIds: [],
      lineItemId: val,
      sectionId: section
    };
    this.ifSelectedLine = event.checked;
    if (event.checked) {
      this.finalArr.push(k);
    }
    if (!event.checked) {
      const idx = this.finalArr.findIndex(
        e => e.lineItemId === event.source.id
      );
      this.finalArr.splice(idx, 1);
      this.vc.map(va => {
        va.checked = false;
      });
      const lineIdx = this.filteredSection[0].lineItems.findIndex(
        e => e._id === event.source.id
      );
      this.filteredSection[0].lineItems[lineIdx].subLineItems = [];
    }
  }

  // selects quote and add's to final array agains lineitems and removes it.
  getQuote(event, quote, filteredQuote) {
    console.log(event.source);
    if (event.checked) {
      this.finalArr.map(val => {
        val.subLineItemIds.push(quote._id);
      });
      this.filteredSection[0].lineItems.map(val => {
        val.subLineItems.push(quote);
      });
    }
    if (!event.checked) {
      this.finalArr.map(val => {
        const idx = val.subLineItemIds.findIndex(e => e === event.source.id);
        val.subLineItemIds.splice(idx, 1);
        this.filterFilteredArr(val, event.source.id);
      });
    }
  }
  filterFilteredArr(val, sourceId) {
    const lineIdx = this.filteredSection[0].lineItems.findIndex(
      e => e._id === val.lineItemId
    );
    const sLineIdx = this.filteredSection[0].lineItems[
      lineIdx
    ].subLineItems.findIndex(e => e._id === sourceId);
    this.filteredSection[0].lineItems[lineIdx].subLineItems.splice(sLineIdx, 1);
  }

  toBid() {
    this.router.navigate(["/fast-bid-prepare/" + this.tenderId]);
  }
}
