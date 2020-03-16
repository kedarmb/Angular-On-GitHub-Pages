import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'app/shared/core/service/helper.service';
import { HttpService } from 'app/shared/core/service/http.service';
import { MatDialog, setLines } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import _lo from 'lodash';
export const finalObj = {
  subLineItemIds: [],
  lineItemId: String,
  sectionId: String
};
export const removefinalObj = {
  subLineItemIds: [],
  lineItem: String,
  section: String
};
@Component({
  selector: 'app-tender-fast-attach',
  templateUrl: './tender-fast-attach.component.html',
  styleUrls: ['./tender-fast-attach.component.scss']
})
export class TenderFastAttachComponent implements OnInit {
  tenderId: any;
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
  add: boolean;

  constructor(
    private router: Router,
    private hs: HelperService,
    private httpService: HttpService,
    public fastCompareDialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
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

  // method runs on select/unselect of line item.
  selectLineItem(e, itemId, sectionId) {
    // object for line item to send to server.
    finalObj.lineItemId = itemId._id;
    finalObj.sectionId = sectionId;

    // property to validate if any line item selected to disable
    // select section selectbox.
    this.ifSelectedLine = e.checked;

    // create's a object for selected line item.
    this.lineItemId.push(itemId);
    // if line item checked is true.
    if (e.checked) {
      if (!this.checkLineItem(itemId)) {
        this.finalArr.push(finalObj);
      }
      if (!this.finalArr.length) {
        this.finalArr.push(finalObj);
      }
    }

    // if line item checked is false.
    if (!e.checked) {
      // deleting items from tempFinalArr, lineItemId array's.
      const idx = this.finalArr.findIndex(el => el.lineItemId === e.source.id);
      this.finalArr.splice(idx, 1);
      const lineIdx2: any = this.lineItemId.findIndex(el2 => el2._id === e.source.id);
      this.lineItemId.splice(lineIdx2, 1);
      if (this.lineItemId.length <= 1) {
        this.subQuote.map(val => {
          val.checked = false;
        });
      }
    }
  }

  // method to check if line item exists
  checkLineItem(id) {
    let k = false;
    for (let i in this.finalArr) {
      if (this.finalArr[i].lineItemId == id) {
        k = true;
        break;
      }
    }
    return k;
  }

  selectsublineItem(e, subLine, quoteArr) {
    // if subline checked is true.
    if (e.checked) {
      this.subLineObj.push(subLine);
    }
    // if subline checked is false remove from subLineObj.
    if (!e.checked) {
      const subline = this.subLineObj.findIndex(e => e === subLine._id);
      this.subLineObj.splice(subline, 1);
    }
  }
  assignSubline() {
    // json to sending to server.
    this.finalArr.map(val => {
      for (let line of this.lineItemId) {
        if (line._id === val.lineItemId) {
          const tempSubline = this.subLineObj.map(sub => sub._id);
          const tempSubLineItemIds = [...val.subLineItemIds, ...tempSubline];
          const k = tempSubLineItemIds.filter((thing, index, self) => {
            return index === self.findIndex(t => t == thing);
          });
          val.subLineItemIds = k;
        }
      }
    });
    this.add = true;
    // json to show on UI.
    for (let i of this.lineItemId) {
      for (let line of this.filteredSection[0].lineItems) {
        if (line._id == i._id) {
          const templine = [...line.subLineItems, ...this.subLineObj];
          line.subLineItems = templine.filter((thing, index, self) => {
            return index === self.findIndex(t => t._id == thing._id);
          });
        }
      }
    }
    console.log(this.finalArr);

    // resetting checkbox array's.
    this.lineCheck.map(e => {
      e.checked = false;
    });
    this.subQuote.map(e => {
      e.checked = false;
    });

    // resetting checkbox array's data.
    this.lineItemId = [];
    this.subLineObj = [];
    // this.finalArr = [];
    this.ifSelectedLine = false;
    console.log(this.finalArr);
  }

  removeSubline(index, item, sub, lIdx) {
    const j = this.filteredSection[0].lineItems.findIndex(e => e._id === item._id);
    const k = this.filteredSection[0].lineItems[j].subLineItems.findIndex(e => {
      return e._id === sub._id;
    });

    this.filteredSection[0].lineItems[j].subLineItems.splice(index, 1);
    if (this.finalArr.length) {
      const fArrIdx = this.finalArr.findIndex(e => e.lineItemId === item._id);
      const sublineId = this.finalArr[fArrIdx].subLineItemIds.findIndex(i => i === sub._id);
      this.finalArr[fArrIdx].subLineItemIds.splice(sublineId, 1);
      this.finalArr.map((i, idx) => {
        if (!i.subLineItemIds.length) {
          this.finalArr.splice(idx, 1);
        }
      });
    }

    const removeFinalArr = [];
    const removeFinal = Object.assign({}, removefinalObj);
    removeFinal.lineItem = item._id;
    removeFinal.section = this.sectionId;
    removeFinal.subLineItemIds.push(sub._id);
    removeFinalArr.push(removeFinal);
    console.log(removeFinal);
    removeFinalArr;
    console.log(this.finalArr);
    this.removeSubFormLine(removeFinalArr);
  }

  toBid() {
    this.router.navigate(['/fast-bid-prepare/' + this.tenderId]);
  }

  //
  // get API's start
  //

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
    this.httpService.updateSeletedSubForLine(this.finalArr, this.tenderId).subscribe(
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
  removeSubFormLine(removeObj) {
    this.spinner.show();
    this.httpService.removeSubFromLine(removeObj, this.tenderId).subscribe(
      response => {
        this.spinner.hide();
        if (response.status === 200) {
          console.log(response);
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
