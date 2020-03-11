import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'app/shared/core/service/helper.service';
import { HttpService } from 'app/shared/core/service/http.service';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tender-fast-attach',
  templateUrl: './tender-fast-attach.component.html',
  styleUrls: ['./tender-fast-attach.component.scss']
})
export class TenderFastAttachComponent implements OnInit {
  tenderId: any;
  // sectionId: any;
  tenderData: any;
  selectedQuotes: Object;
  filteredSection: any;
  finalArr = [];
  sectionId: any;
  ifSelectedLine = false;
  @ViewChildren('quo') subQuote: QueryList<any>;
  @ViewChildren('lineCheck') lineCheck: QueryList<any>;
  lineItemId = [];
  finalsubline = [];
  _Items = [];
  subLineObj = [];
  tempFinalArr = [];

  constructor(
    private router: Router,
    private hs: HelperService,
    private httpService: HttpService,
    public fastCompareDialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    this.tenderId = JSON.parse(this.hs.getSession('tenderIdNow'));
  }

  ngOnInit() {
    this.getTenderById();
    this.getSelectedSubline();
  }

  // filters section from dropdown.
  selectSection(sectionId, a) {
    this.filteredSection = this.tenderData.sections.filter(section => section._id === sectionId);
    this.sectionId = sectionId;
  }

  selectLineItem(e, itemId, sectionId) {
    console.log(itemId, e);
    const finalObj = {
      subLineItemIds: [],
      lineItemId: itemId,
      sectionId: sectionId
    };

    //  this.sectionId = sectionId;
    this.ifSelectedLine = e.checked;

    this.lineItemId.push(itemId);
    // on select event
    if (e.checked) {
      if (!this.checkLineItem(itemId)) {
        this.tempFinalArr.push(finalObj);
        console.log(this.tempFinalArr);
      }
      if (!this.tempFinalArr.length) {
        // this.lineItemId.push(itemId);
        this.tempFinalArr.push(finalObj);
        console.log(this.tempFinalArr);
      }
    }

    // on unselect event
    if (!e.checked) {
      const idx = this.tempFinalArr.findIndex(el => el.lineItemId === e.source.id);
      this.tempFinalArr.splice(idx, 1);
      const lineIdx2: any = this.lineItemId.findIndex(el2 => el2 === e.source.id);
      this.lineItemId.splice(lineIdx2, 1);
      this.subQuote.map(val => {
        val.checked = false;
      });
      console.log(this.tempFinalArr);
    }
  }
  checkLineItem(id) {
    let k = false;
    for (let i in this.tempFinalArr) {
      if (this.tempFinalArr[i].lineItemId == id) {
        k = true;
        break;
      }
    }
    return k;
  }
  selectsublineItem(e, subLine, quoteArr) {
    if (e.checked) {
      this.subLineObj.push(subLine);
      console.log(this.subLineObj);
    }
    if (!e.checked) {
    }
  }
  assignSubline() {
    this.finalArr = [];
    this.finalArr = [...this.tempFinalArr];
    // json to send to server
    console.log(this.finalArr);
    this.finalArr.map(val => {
      console.log(val);
      for (let i of this.lineItemId) {
        console.log('in for of assignsubline');
        if (i === val.lineItemId) {
          const tempSubline = this.subLineObj.map(sub => sub.subContractorId);
          console.log(tempSubline);
          val.subLineItemIds = [...val.subLineItemIds, ...tempSubline];
        }
      }
    });
    console.log(this.finalArr);
    for (let i of this.lineItemId) {
      for (let line of this.filteredSection[0].lineItems) {
        if (line._id == i) {
          line.subLineItems = [...line.subLineItems, ...this.subLineObj];
        }
      }
    }
    console.log(this.filteredSection);
    this.lineCheck.map(e => {
      e.checked = false;
    });
    this.subQuote.map(e => {
      e.checked = false;
    });
    this.lineItemId = [];
    this.subLineObj = [];
  }

  removeSubline(index, item, sub) {
    // console.log(this.lineCheck);
    console.log(item);
    // console.log(this.filteredSection[0]);
    const j = this.filteredSection[0].lineItems.findIndex(e => {
      console.log(e);
      return e._id === item._id;
    });
    // console.log(item.subLineItems);
    const k = this.filteredSection[0].lineItems[j].subLineItems.findIndex(e => {
      return e._id === sub._id;
    });
    // if (index) {
    console.log(item._id);
    this.filteredSection[0].lineItems[j].subLineItems.splice(index, 1);
    // }
  }

  toBid() {
    this.router.navigate(['/fast-bid-prepare/' + this.tenderId]);
  }
  // get API's start

  // call tender get API
  getTenderById() {
    this.spinner.show();
    this.httpService.getTenderDetailById(this.tenderId).subscribe(
      response => {
        this.spinner.hide();
        if (response.status === 200) {
          this.tenderData = response.body;
          this.hs.setSession('tenderDataNow', JSON.stringify(this.tenderData));
        }
      },
      err => {
        this.spinner.hide();
        console.log('Error getting Tender by id ', err);
      }
    );
  }

  // call tenderpost api
  updateSublineWithLine() {
    this.spinner.show();
    this.httpService.updateSeletedSubForLine(this.tenderId, this.finalArr).subscribe(
      response => {
        this.spinner.hide();
        if (response.status === 200) {
        }
      },
      err => {
        console.log('Error getting Tender by id ', err);
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
        console.log('Error getting Tender by id ', err);
      }
    );
  }
  // Get api's end
}
