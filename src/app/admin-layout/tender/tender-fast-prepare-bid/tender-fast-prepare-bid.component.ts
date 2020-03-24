import { MatDialog } from '@angular/material';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, OnChanges } from '@angular/core';
import { LineItemCrewComponent } from 'app/shared/components/line-item-crew/line-item-crew.component';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TrenchModalComponent } from 'app/shared/components/trench-modal/trench-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tender-fast-prepare-bid',
  templateUrl: './tender-fast-prepare-bid.component.html',
  styleUrls: ['./tender-fast-prepare-bid.component.scss']
})
export class TenderFastPrepareBidComponent implements OnInit, AfterViewInit, OnChanges {
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
  quantity = new FormControl();
  defaultSec;

  constructor(
    private hs: HelperService,
    private router: Router,
    private httpService: HttpService,
    public fastCompareDialog: MatDialog,
    private modalService: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
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
          if (this.tenderData.sections.length) {
            this.tenderData.sections.map((e, i) => {
              if (i == 0) {
                this.defaultSec = e._id;
              }
            });
            console.log(this.defaultSec);
            this.showSection(this.defaultSec);
          }
        }
      },
      err => {
        console.log('Error getting Tender by id', err);
      }
    );
  }

  // call tenderpost api
  createSublineWithLine() {
    this.httpService.updateSeletedSubForLine(this.tenderId, this.finalArr).subscribe(
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

  next() {
    this.router.navigateByUrl('/bid');
  }

  showSection(value) {
    console.log(this.tenderData);
    this.filteredSection = this.tenderData.sections.filter(v => v._id === value);
    this.selectedSection = value;
    this.filteredSection[0].lineItems.map(e => {
      return (e.subTotalPrice = 0);
    });
    console.log(this.filteredSection);
    // = 0; i < this.filteredSection[0].lineItems.length; i++
    // tslint:disable-next-line: forin
    for (const i in this.filteredSection[0].lineItems) {
      const totalPrice = this.filteredSection[0].lineItems[i].subLineItems.map(e => {
        return (e.totalPrice = e.quantity * e.unitPrice);
      });
      if (totalPrice.length) {
        this.sublineTotalPrice = totalPrice.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
      }
      this.filteredSection[0].lineItems.map(e => {
        return (e.subTotalPrice = this.sublineTotalPrice);
      });
      this.filteredSection[0].lineItems[i].total = 0;
      this.filteredSection[0].lineItems[i].total += this.sublineTotalPrice;
      if (this.filteredSection[0].lineItems[i].crewItemRef !== null) {
        this.filteredSection[0].lineItems[i].total += this.filteredSection[0].lineItems[i].crewItemRef.crewTotalCost;
      }
      if (this.filteredSection[0].lineItems[i].total || this.filteredSection[0].lineItems[i].quantity) {
        this.filteredSection[0].lineItems[i].unitPrice =
          this.filteredSection[0].lineItems[i].total / this.filteredSection[0].lineItems[i].quantity;
      }
    }
    this.calculateCrewOnly();
  }
  // filters section from dropdown.

  ngAfterViewInit() {
    // this.showSection;
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
      const idx = this.finalArr.findIndex(e => e.lineItemId === event.source.id);
      this.finalArr.splice(idx, 1);
      this.vc.map(va => {
        return (va.checked = false);
      });
      console.log(event.source.id);
      console.log(idx);
      const lineIdx = this.filteredSection[0].lineItems.findIndex(e => e._id === event.source.id);
      this.filteredSection[0].lineItems[lineIdx].subLineItems = [];
    }
  }
  ngOnChanges() {
    console.log('fired after CHanges');
  }
  getModels(i) {
    const totalPrice = this.filteredSection[0].lineItems[i].subLineItems.map(e => {
      return (e.totalPrice = e.quantity * e.unitPrice);
    });
    this.sublineTotalPrice = totalPrice.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    this.filteredSection[0].lineItems[i].subTotalPrice = this.sublineTotalPrice;
    this.filteredSection[0].lineItems[i].total = 0;
    this.filteredSection[0].lineItems[i].total += this.sublineTotalPrice;
    if (this.filteredSection[0].lineItems[i].crewItemRef !== null) {
      this.filteredSection[0].lineItems[i].total += this.filteredSection[0].lineItems[i].crewItemRef.crewTotalCost;
    }
    if (this.filteredSection[0].lineItems[i].total || this.filteredSection[0].lineItems[i].quantity) {
      this.filteredSection[0].lineItems[i].unitPrice = (
        this.filteredSection[0].lineItems[i].total / this.filteredSection[0].lineItems[i].quantity
      ).toFixed(2);
    }
  }
  calculateCrewOnly() {
    for (let i in this.filteredSection[0].lineItems) {
      console.log(this.filteredSection[0].lineItems[i].total);
      if (isNaN(this.filteredSection[0].lineItems[i].total) || this.filteredSection[0].lineItems[i].total == null) {
        this.filteredSection[0].lineItems[i].total = 0;
        console.log(this.filteredSection[0].lineItems[i].total);
      }
      if (
        isNaN(this.filteredSection[0].lineItems[i].unitPrice) ||
        this.filteredSection[0].lineItems[i].unitPrice == null
      ) {
        this.filteredSection[0].lineItems[i].unitPrice = 0;
        console.log(this.filteredSection[0].lineItems[i].unitPrice);
      }
      if (this.filteredSection[0].lineItems[i].crewItemRef != null) {
        if (
          this.filteredSection[0].lineItems[i].subLineItems.length == 0 ||
          this.filteredSection[0].lineItems[i].subLineItems == null
        ) {
          this.filteredSection[0].lineItems[i].total += this.filteredSection[0].lineItems[i].crewItemRef.crewTotalCost;
          this.filteredSection[0].lineItems[i].unitPrice = (
            this.filteredSection[0].lineItems[i].total / this.filteredSection[0].lineItems[i].quantity
          ).toFixed(2);
          console.log(this.filteredSection[0].lineItems[i].total);
        }
      }
    }
  }

  protected addEditCrewToLine(item) {
    //
    const postObj = this.getCrewPostObj();
    postObj.tender = this.tenderId;
    postObj.section = this.selectedSection;
    postObj.lineItem = item;
    postObj.crewItemRef = item.crewItemRef;
    //
    const modalRef = this.modalService.open(LineItemCrewComponent, {
      height: 'auto',
      width: '65%',
      data: postObj,
      disableClose: true,
      maxHeight: '95vh'
    });
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
        // console.log(response.data);
      }
      if (response.status === 'add' || response.status === 'update') {
        // console.log('crew resp... ', response);
        this.getTenderById();
        this.calculateCrewOnly();
        //
        setTimeout(() => {
          //this.refreshFormData();
        }, 500);
      }
    });
  }

  private getCrewPostObj() {
    const postIds = {
      tender: null,
      section: null,
      lineItem: null,
      crewItemRef: null,
      crewLabourEquipment: null,
      labourTotalCost: null,
      equipmentTotalCost: null,
      crewTotalCost: null,
      organizationId: null,
      labourArr: null,
      equipmentArr: null
    };
    return postIds;
  }

  postSubline(item) {
    const finalArr = {
      sublineItem: [],
      lineTotalPrice: [
        {
          section: this.selectedSection,
          lineItem: item._id,
          unitPrice: item.unitPrice,
          total: item.total
        }
      ]
    };
    const _finalArr = [...item.subLineItems];
    const k = _finalArr.map(val => {
      delete val.unitPrice;
      delete val.unit;
      delete val.description;
      delete val.name;
      return val;
    });
    const completeArr = k.map(val => {
      val.lineItem = item._id;
      val.section = this.selectedSection;
      return val;
    });
    finalArr.sublineItem = completeArr;
    this.httpService.postSubline(finalArr, this.tenderId).subscribe(
      response => {
        if (response.status === 201) {
          this.hs.setSession('tenderDataNow', JSON.stringify(response.body));

          const l = JSON.parse(this.hs.getSession('tenderDataNow'));
          this.tenderData = l[0];
          this.showSection(this.selectedSection);
          this.toastr.success('Saved successfully');
        }
      },
      err => {
        console.log('Error getting Tender by id', err);
      }
    );
  }

  protected deleteCrewFromLine(crewRefParam) {
    console.log('crewRefParam is ... ', crewRefParam);
    this.httpService.deleteCrewForLineItem(crewRefParam._id).subscribe(
      response => {
        console.log(response);
        if (response.status === 200) {
          this.calculateCrewOnly();
          setTimeout(() => {
            //this.refreshFormData();
          }, 100);
          this.toastr.success('Crew for Line Item deleted');
        }
      },
      err => {
        this.toastr.error('Error deleting crew for line item. Please try later.');
        console.log('erre deleting crew for Line Item ', err);
      }
    );
  }

  // Trench Integration
  protected addTrenchToLine(item) {
    // console.log('section  id ?? ', this.selectedSection);
    console.log('line Item  id ?? ', item);
    //
    /// return;
    const postObj = this.getTrenchPostObject();
    postObj.tender = this.tenderId;
    postObj.section = this.selectedSection;
    postObj.lineItem = item._id;
    postObj.hasTrenchRef = item.trenchRef;
    //
    const modalRef = this.modalService.open(TrenchModalComponent, {
      height: 'auto',
      width: '85%',
      data: postObj,
      disableClose: true,
      maxHeight: '95vh'
    });
    // 
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
        this.getTenderById();
        this.showSection(this.selectedSection);
        console.log('testing by pravin', response.data);
        this.spinner.hide();
      }
      if (response.status === 'add' || response.status === 'update') {
        this.getTenderById();
        this.hs.setSession('tenderDataNow', JSON.stringify(response.data));
        this.tenderData = JSON.parse(this.hs.getSession('tenderDataNow'));
        this.showSection(this.selectedSection);
        console.log('Trench resp add by pravin... ', response);
      }
    });
  }

  protected deleteTrenchFromLine(selectedSection, item, trenchRef) {
    // https://smartbid-api.herokuapp.com/v1/trench/tender/:tenderId/section/:sectionId/lineItem/:lineItemId/trench/:id
    console.log('trench Id is .. ', trenchRef);
    this.spinner.show();
    this.httpService.deleteTrenchFromLineItem(trenchRef._id).subscribe(
      (response: any) => {
        this.spinner.hide();
        console.log(response);
        // TODO: res status is 201 now - should be 200 from BE team
        if (response.status === 200) {
          this.toastr.success('Trench has been successfully deleted.');
          //this.refreshFormData();
        }
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Could not delete Trench. Please try later.');
      }
    );
  }

  public getTrenchPostObject() {
    const postTrenchIds = {
      tender: null,
      section: null,
      lineItem: null,
      hasTrenchRef: null,
      // above keys are for POST/PUT API - following is the payload
      calculationName: null,
      beddingLength: null,
      beddingWidth: null,
      beddingHeight: null,
      beddingVolume: null,
      beddingWeight: null,
      pipeDiameter: null,
      pipeVolume: null,
      pipeHeight: null,
      effectiveVolume: null,
      backfillDensity: null,
      densityBedding: null,
      backfillLength: null,
      backfillWidth: null,
      backfillVolume: null,
      backfillHeight: null,
      backfillWeight: null
    };
    return postTrenchIds;
  }
}
