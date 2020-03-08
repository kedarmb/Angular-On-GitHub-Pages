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
  lineItemId = [];

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
    console.log(sectionId);
    this.filteredSection = this.tenderData.sections.filter(section => section._id === sectionId);
    this.sectionId = sectionId;
  }

  selectLineItem(e, itemId, sectionId) {
    const finalObj = {
      subLineItemIds: [],
      lineItemId: itemId,
      sectionId: sectionId
    };

    //  this.sectionId = sectionId;
    this.ifSelectedLine = e.checked;

    // on select event
    if (e.checked) {
      // creating selecte lineitem array
      this.lineItemId.push(itemId);
      console.log(this.lineItemId);
      this.finalArr.push(finalObj);
      console.log(this.finalArr);
    }

    // on unselect event
    if (!e.checked) {
      console.log(e);
      const idx = this.finalArr.findIndex(el => e.lineItemId === e.source.id);
      this.finalArr.splice(idx, 1);
      console.log(this.finalArr);
      const lineIdx2: any = this.lineItemId.findIndex(el2 => el2 === e.source.id);
      this.lineItemId.splice(lineIdx2, 1);
      console.log(lineIdx2);
      console.log(this.lineItemId);

      // to mark all subline as Unchecked
      this.subQuote.map(val => {
        val.checked = false;
      });

      // find and set subline array null
      const lineIdx1: any = this.filteredSection[0].lineItems.findIndex(el => el._id === e.source.id);
      this.filteredSection[0].lineItems[lineIdx1].subLineItems = [];
    }
  }

  // selects, add & remove lineitems and disables dropdown and enables subline to select.
  /*   getSelectedLine(event, val, section) {
    console.log(event);
    this.lineitemId.push(val)
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
        console.log(val)
        console.log(this.lineitemId)
        for(let i of this.lineitemId){
          console.log(i)
          if(val._id === i){
            console.log('hurray')
            val.subLineItems.push(quote);
          }
        }
      });
      console.log('checked')
    }
    if (!event.checked) {
      console.log('unchecked')
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
    const sLineIdx = this.filteredSection[0].lineItems[lineIdx].subLineItems.findIndex(e =>
    e._id === sourceId);
    this.filteredSection[0].lineItems[lineIdx].subLineItems.splice(sLineIdx, 1);
  }
 */
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
