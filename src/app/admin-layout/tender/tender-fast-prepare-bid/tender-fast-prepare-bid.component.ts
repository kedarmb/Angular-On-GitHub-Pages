import { MatDialog } from '@angular/material';
import { PlatformLocation } from '@angular/common';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { Router } from '@angular/router';
import { Component, OnInit, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { LineItemCrewComponent } from 'app/shared/components/line-item-crew/line-item-crew.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tender-fast-prepare-bid',
  templateUrl: './tender-fast-prepare-bid.component.html',
  styleUrls: ['./tender-fast-prepare-bid.component.scss']
})
export class TenderFastPrepareBidComponent implements OnInit, AfterViewInit {
  tenderId: any;
  sectionId: any;
  tenderData: any;
  selectedQuotes: Object;
  filteredSection: any;
  finalArr = [];
  selectedSection: any;
  ifSelectedLine = false;
  @ViewChildren('quo') vc: QueryList<any>;
  getModelId = [];
  mVal: any;
  sublineTotalPrice: any;
  quantity = new FormControl;

  constructor(
    private hs: HelperService,
    private httpService: HttpService,
    public fastCompareDialog: MatDialog,
    private modalService: MatDialog
  ) {
    this.tenderId = JSON.parse(this.hs.getSession('tenderIdNow'));
    // location.onPopState((e) => {
    //   if (e.type === 'popstate') {
    //     this.router.navigate(['/fast-compare/' + this.tenderId]);
    //   }
    // });
  }

  ngOnInit() {
    this.getTenderById();
    this.getSelectedSubline();
  }

  // call tender get API
  getTenderById() {
    this.httpService.getTenderDetailById(this.tenderId).subscribe(
      response => {
        if (response.status === 200) {
          this.hs.setSession('tenderDataNow', JSON.stringify(response.body));
          this.tenderData = JSON.parse(this.hs.getSession('tenderDataNow'));
        }
      },
      err => {
        console.log('Error getting Tender by id', err);
      }
    );
  }
  // call tenderpost api
  createSublineWithLine() {
    this.httpService
      .getseletedSubForLine(this.tenderId, this.finalArr)
      .subscribe(
        response => {
          if (response.status === 200) {
            console.log(response);
          }
        },
        err => {
          console.log('Error getting Tender by id ', err);
        }
      );
  }
  // call subline get API
  getSelectedSubline() {
    this.httpService.getselectedsubline(this.tenderId).subscribe(
      response => {
        if (response.status === 201) {
          this.selectedQuotes = response.body;
        }
      },
      err => {
        console.log('Error getting Tender by id', err);
      }
    );
  }

  showSection(value, a) {
    this.filteredSection = this.tenderData.sections.filter(
      v => v._id === value
    );
    this.selectedSection = value;
    this.filteredSection[0].lineItems.map(e => {
      return e.subTotalPrice = 0
    })
    console.log(this.filteredSection);
    // = 0; i < this.filteredSection[0].lineItems.length; i++
    for (let i in this.filteredSection[0].lineItems){
      const totalPrice = this.filteredSection[0].lineItems[i].subLineItems.map(e => {
        return e.totalPrice = e.quantity * e.unitPrice;
      })
      if(totalPrice.length){
        this.sublineTotalPrice = totalPrice.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        })
      }
      this.filteredSection[0].lineItems.map(e => {
        return e.subTotalPrice = this.sublineTotalPrice
      })
      this.filteredSection[0].lineItems[i].total += this.sublineTotalPrice;
      if (this.filteredSection[0].lineItems[i].crewItemRef !== null){
        this.filteredSection[0].lineItems[i].total += this.filteredSection[0].lineItems[i].crewItemRef.crewTotalCost;
      }
      if (this.filteredSection[0].lineItems[i].total || this.filteredSection[0].lineItems[i].quantity)
        this.filteredSection[0].lineItems[i].unitPrice = this.filteredSection[0].lineItems[i].total / this.filteredSection[0].lineItems[i].quantity
    }

  }
  // filters section from dropdown.

  ngAfterViewInit() {
    this.showSection
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
    console.log(event.source.id);
    if (!event.checked) {
      const idx = this.finalArr.findIndex(
        e => e.lineItemId === event.source.id
      );
      this.finalArr.splice(idx, 1);
      this.vc.map(va => {
        va.checked = false;
      });
      console.log(event.source.id);
      console.log(idx);
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

  getModels(i) {
    const totalPrice = this.filteredSection[0].lineItems[i].subLineItems.map(e => {
      return e.totalPrice = e.quantity * e.unitPrice;
    })
    this.sublineTotalPrice = totalPrice.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    })
    this.filteredSection[0].lineItems[i].subTotalPrice = this.sublineTotalPrice
    this.filteredSection[0].lineItems[i].total = this.sublineTotalPrice;

    console.log(this.filteredSection)
    console.log(this.sublineTotalPrice)
  }
 

  addCrewToLine(sectionID, lineItmID, lineItemRef?, sectionRef?) {
    // this.currentSection = sectionRef;
    // this.currentLineItem = lineItemRef;
    // console.log('this.currentLineItem >>> ', this.currentLineItem)
    //
    console.log(sectionID, lineItmID);

    const postIds = {
      tender: this.tenderData._id, section: sectionID, lineItem: lineItmID,
      crewLabourEquipment: null, labourTotalCost: null,
      equipmentTotalCost: null, crewTotalCost: null, organizationId: null,
      labourArr: null, equipmentArr: null
    }
    const modalRef = this.modalService.open(LineItemCrewComponent, {
      height: 'auto',
      width: '65%', data: postIds, disableClose: true
    });
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
        console.log(response.data);

      } if (response.status === 'add') {
        this.getTenderById()
        console.log('crew resp... ', response);
      }
    })
  }



}
