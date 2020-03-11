import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../../shared/core/service/http.service';
import { NgProgressComponent, NgProgressRef, NgProgress } from '@ngx-progressbar/core';
import { MatDialog } from '@angular/material';
import { CrewModalComponent } from '../../../../shared/components/crew-modal/crew-modal.component';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../../shared/core/service/helper.service';
import { TenderService } from '../../../../shared/core/service/tender.service';
import { TrenchModalComponent } from 'app/shared/components/trench-modal/trench-modal.component';
import { LineItemCrewComponent } from 'app/shared/components/line-item-crew/line-item-crew.component';
import { NgxSpinnerService } from 'ngx-spinner';
//
import { regex } from '../../../../shared/core/constant/index';

@Component({
  selector: 'app-tender-item',
  templateUrl: './tender-item.component.html',
  styleUrls: ['./tender-item.component.scss']
})
export class TenderItemComponent implements OnInit, OnChanges {
  @Input() tenderData: any;
  @Input() selectedSubInp: any;
  // labourHR= new FormControl();
  displayedColumns: string[] = ['ItemNo', 'SpecNo', 'ItemName', 'Description', 'Unit', 'Unit-Price', 'Quantity', 'TotalPrice'];
  //
  masterForm: FormGroup; // var to store form
  tender; // model instance
  lineItemsArr: any;
  //
  collapse: boolean[] = [];
  lineItemTotal: any;
  trenchList: any[];
  //
  progressRef: NgProgressRef;
  crewObj = {};
  trenchObj: any;
  //
  update = {
    data: '',
    val: false
  };
  cObj: any;
  eObj: any;
  //
  totalSublineCost = 0;
  totalCrewCost = 0;
  //
  currentSection: any;
  currentLineItem: any;
  currentSubLine: any;

  //
  constructor(
    private formBuilder: FormBuilder,
    private modalService: MatDialog,
    private progress: NgProgress,
    private httpService: HttpService,
    private hs: HelperService,
    private toastr: ToastrService,
    private ts: TenderService,
    private spinner: NgxSpinnerService
  ) {
    //
  }

  ngOnInit() {
    this.getTrenchs();
  }

  ngOnChanges() {
    //
    if (this.masterForm == null) {
      this.initMasterForm();
    }
    // console.log('ngOnChanges.... ', this.tenderData);
    if (this.tenderData) {
      //
      if (this.tenderData.sections == null && this.tenderData.sections === []) {
        // open blank master form
      } else if (this.tenderData.sections != null && this.tenderData.sections !== []) {
        //
        this.createSectionsOnGet();
      }
    }
  }

  // creating masterform
  initMasterForm() {
    this.masterForm = this.formBuilder.group({
      _id: [null],
      clientName: [''],
      name: [''],
      description: [''],
      openDate: [''],
      closeDate: [''],
      quoteStartDate: [''],
      quoteEndDate: [''],
      headerLevelNotifiedSubs: [''],
      createdBy: [null],
      updatedBy: [null],
      organizationRef: [null],
      // sections:[''],
      createdAt: [''],
      updatedAt: [''],
      sections: this.formBuilder.array([this.initSectionCtrl()])
    });
    // console.log(this.masterForm);
  }

  initSectionCtrl() {
    return this.formBuilder.group({
      _id: [null],
      name: [''],
      sectionTotalPrice: [''],
      lineItems: this.formBuilder.array([this.initLineItemCtrl()])
    });
  }
  initLineItemCtrl() {
    return this.formBuilder.group({
      _id: [null],
      specNo: [''],
      itemNo: [''],
      itemName: [''],
      description: [''],
      unit: [],
      unitPrice: [null],
      quantity: [null],
      trench: [''],
      crew: [''],
      notifiedSubs: [null],
      selectedSub: [null],
      lineItemCrewLabourItems: [null],
      lineTotalPrice: [null],
      subLineItems: [null],
      crewChosen: [],
      crewItemRef: [null],
      trenchRef: [null]
    });
  }
  initSubLineItemCtrl() {
    return this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      unit: ['', [Validators.required, Validators.pattern(regex.alphaNumeric)]],
      quantity: ['', [Validators.required, Validators.pattern(regex.numericDecimal)]],
      unitPrice: ['', [Validators.required, Validators.pattern(regex.numericDecimal)]],
      totalPrice: [''],
      subContractorId: ['']
    });
  }

  // starting point of Quote-Form generation on GET call
  createSectionsOnGet() {
    const sections_array = this.masterForm.get('sections') as FormArray;
    // remove the empty element already created:
    while (sections_array.length !== 0) {
      sections_array.removeAt(0);
    }
    //
    this.tenderData.sections.forEach(sectionRef => {
      // console.log('sectionRef is ', sectionRef);
      sections_array.push(
        this.formBuilder.group({
          _id: sectionRef._id,
          name: sectionRef.name,
          lineItems: this.createLineItemsOnGet(sectionRef)
        })
      );
    });
    // console.log(this.masterForm);
  }

  // starting point of Line Item generation on GET call
  createLineItemsOnGet(sectionRef) {
    const line_items_array = new FormArray([]);
    // console.log('section ref is ', sectionRef);
    //
    sectionRef.lineItems.forEach(lineItem => {
      //
      line_items_array.push(
        this.formBuilder.group({
          _id: lineItem._id,
          specNo: lineItem.specNo,
          itemNo: lineItem.itemNo,
          itemName: lineItem.itemName,
          description: lineItem.description,
          unit: lineItem.unit,
          unitPrice: lineItem.unitPrice,
          quantity: lineItem.quantity,
          trench: lineItem.trench,
          crew: lineItem.crew,
          notifiedSubs: lineItem.notifiedSubs,
          selectedSub: lineItem.selectedSub,
          lineItemCrewLabourItems: lineItem.lineItemCrewLabourItems,
          lineTotalPrice: this.createLineTotalPriceArrOnGet(lineItem.lineTotalPrice),
          _totalPrice: this.returnLineToatlOrUnitPrice(lineItem.lineTotalPrice, 'totalPrice', lineItem, 'total'),
          _unitPrice: this.returnLineToatlOrUnitPrice(lineItem.lineTotalPrice, 'totalPrice', lineItem, 'unit'),
          crewItemRef: lineItem.crewItemRef,
          crewChosen: [],
          trenchRef: lineItem.trenchRef,
          subLineItems: this.createSubLineItemsOnGet(lineItem)
        })
      );
    });
    return line_items_array;
  }

  // populates 'lineTotalPrice' array on Line Items on GET API call
  createLineTotalPriceArrOnGet(priceArr) {
    const lineTotalArr = new FormArray([]);
    priceArr.forEach(item => {
      lineTotalArr.push(
        this.formBuilder.group({
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          quoteSub: item.quoteSub,
          _id: item._id
        })
      );
    });
    return lineTotalArr;
  }

  //
  private returnLineToatlOrUnitPrice(totalPricesArr, prop, lineItemRef, queryType) {
    let propVal = 0;
    let crewVal = 0;
    let returnValue = 0;
    //
    if (this.selectedSubInp != undefined) {
      // user comes to this page & selects one SubC.
      for (let i = 0; i < totalPricesArr.length; i++) {
        if (totalPricesArr[i].quoteSub === this.selectedSubInp._id) {
          propVal = totalPricesArr[i][prop];
          break;
        }
      }
    }
    if (lineItemRef.crewItemRef != null) {
      crewVal = lineItemRef.crewItemRef.crewTotalCost;
    }
    //
    const totalCrewSubs = crewVal + propVal;
    //0
    if (queryType == 'total') {
      returnValue = totalCrewSubs;
    } else if (queryType == 'unit') {
      returnValue = Number((totalCrewSubs / lineItemRef.quantity).toFixed(2));
    }
    return returnValue;
  }

  createSubLineItemsOnGet(lineItemRef) {
    const sub_line_array = new FormArray([]);
    //
    lineItemRef.subLineItems.forEach(subLineItem => {
      //
      if (this.selectedSubInp != undefined) {
        // console.log(subLineItem.subContractorId, ' ..... ', this.selectedSubInp._id);
        if (subLineItem.subContractorId === this.selectedSubInp._id) {
          //
          sub_line_array.push(
            this.formBuilder.group({
              //
              _id: subLineItem._id,
              name: subLineItem.name,
              unit: subLineItem.unit,
              quantity: subLineItem.quantity,
              unitPrice: subLineItem.unitPrice,
              totalPrice: subLineItem.totalPrice,
              subContractorId: subLineItem.subContractorId
            })
          );
        }
      }
      //
    });
    return sub_line_array;
  }
  //

  createLineItemForm(sectionRef) {
    // console.log('sectionRef:  ', sectionRef.lineItems as FormArray);
    let lineItemFormArr: FormArray = sectionRef.lineItems as FormArray;
    lineItemFormArr = this.formBuilder.array([]);
    //
    sectionRef.lineItems.forEach(item => {
      lineItemFormArr.push(this.ts.createItemCtrl(item));
      //
      let subItemNode: FormArray = item.subLineItems as FormArray;
      subItemNode = new FormArray([]);
      //
      item.subLineItems.forEach(subItem => {
        // console.log(subItem)
        subItemNode.push(this.ts.createSublineItemsCtrls(subItem));
        // console.log('subItemNode is :  ', subItemNode);
      });
      //
    });
    // console.log(lineItemFormArr);
    return lineItemFormArr;
  }

  __addSubLineItem(lineItemRef) {
    const sublineItemArr = lineItemRef.get('subLineItems') as FormArray;
    // check if the last one is saved already
    let allowFlag = false;
    const lastOne = sublineItemArr.at(sublineItemArr.length - 1);
    //
    if (sublineItemArr.length <= 0) {
      allowFlag = true;
    } else if (sublineItemArr.length > 0) {
      if (lastOne.value._id === '') {
        allowFlag = false;
        this.toastr.warning('Please save the existing Subline first', 'Action denied');
      } else if (lastOne.value._id != '') {
        allowFlag = true;
      }
      // console.log('last one .. ', lastOne);
    }

    if (allowFlag) {
      const _sublineItem = this.initSubLineItemCtrl();
      sublineItemArr.push(_sublineItem);
    }
  }
  __removeSubLineItem(lineItemRef, indx) {
    const sublineItemArr = lineItemRef.get('subLineItems') as FormArray;
    const sublineRef = sublineItemArr.at(indx).value;
    //
    console.log('sublineRef ... ', sublineRef);
    //
    if (sublineRef._id == '') {
      // subline not saved yet.. just removing from local array
      sublineItemArr.removeAt(indx);
    } else if (sublineRef._id != '') {
      console.log('delete with API ... ');
      this.toastr.info('Feature under development');
      // this.toastr.success('Successfully deleted subline item');
      /* this.httpService.deleteSubLineItem(sublineRef._id).subscribe(
        response => {
          console.log(response);
          if (response.status === 200) {
            this.toastr.success('Successfully deleted subline item');
            this.calculateSublineTotal(lineItemRef);
            setTimeout(() => {
              this.refreshFormData();
            }, 100);
          }
        },
        err => {
          this.toastr.error('Error deleting subline item. Please try later.');
          console.log('Error deleting subline item ', err);
        }
      ); */
    }
  }

  __saveSubLineItem(sectionRef, lineitemRef, indx) {
    //
    const id = this.tenderData._id;
    const secID = sectionRef.value._id;
    const lineID = lineitemRef.value._id;
    //
    const _subLineItmRef = (lineitemRef.get('subLineItems') as FormArray).at(indx);
    if (!this.checkSublineDataValidity(_subLineItmRef)) {
      return;
    }
    console.log('good to go to save sub line ... ');
    // return;
    let appendStr = '/tender/' + id + '/section/' + secID + '/lineItem/' + lineID;
    //
    const _sublineQuote = Object.assign({}, (lineitemRef.get('subLineItems') as FormArray).at(indx).value);
    // console.log('subline item before saving ...', _sublineQuote);
    //
    _sublineQuote['subContractorId'] = this.selectedSubInp._id;
    //
    this.spinner.show();
    let lineTotal_id;
    // console.log(lineitemRef.value);
    const lineTotalPricesArr = lineitemRef.value.lineTotalPrice;
    for (let i = 0; i < lineTotalPricesArr.length; i++) {
      if (lineTotalPricesArr[i].quoteSub === this.selectedSubInp._id) {
        lineTotal_id = lineTotalPricesArr[i]._id;
        break;
      }
    }
    const lineItemData = {
      unitPrice: lineitemRef.value.unitPrice,
      totalPrice: this.addAllLineLevelSublines(lineitemRef),
      quoteSub: this.selectedSubInp._id,
      _id: lineTotal_id
    };
    // if _id undefined ..i.e first subline to add - delete it
    if (lineItemData._id === undefined) {
      delete lineItemData._id;
    }
    //
    const finalPayload = {
      sublineItem: _sublineQuote,
      lineTotalPrice: lineItemData
    };
    console.log('finalPayload is..  ', finalPayload);
    // return;
    if (_sublineQuote._id == '') {
      // no _id .. fresh subline item to POST
      delete _sublineQuote._id;
      this.httpService.saveSubLineItem(appendStr, finalPayload).subscribe(
        response => {
          console.log('succ in saving subline item ', response);
          if (response.status === 201) {
            this.toastr.success('Successfully saved Subline Item.');
            this.refreshFormData();
          }
        },
        err => {
          this.spinner.hide();
          this.toastr.error('Error in saving Subline item. Try later');
          console.log('err in saving subl ine  item ', err);
        }
      );
    } else if (_sublineQuote._id != '') {
      // post API to call to update existing subline item
      // console.log('PUT for subline ... ', appendStr);
      // console.log(JSON.stringify(finalPayload));
      appendStr = '/' + _sublineQuote._id + '/tender/' + id + '/section/' + secID + '/lineItem/' + lineID;
      this.httpService.updateSubLineItem(appendStr, finalPayload).subscribe(
        response => {
          console.log('succ in saving subline item ', response);
          if (response.status === 200) {
            this.toastr.info('Successfully updated Subline Item.');
            this.refreshFormData();
          }
        },
        err => {
          this.toastr.error('Error in updating Subline item. Try later');
          console.log('err in saving subl ine  item ', err);
        }
      );
    }
  }

  // checks data validity as per validation rule defined on form control
  checkSublineDataValidity(_subLineRef) {
    let _isValid = true;
    if (_subLineRef.get('name').invalid) {
      this.toastr.warning('Name of the Subline Item must be defined.');
      _isValid = false;
    } else if (_subLineRef.get('unit').invalid) {
      this.toastr.warning('Unit must be filled without special characters.');
      _isValid = false;
    } else if (_subLineRef.get('unitPrice').invalid) {
      this.toastr.warning('Unit Price must be filled with numeric value.');
      _isValid = false;
    } else if (_subLineRef.get('quantity').invalid) {
      this.toastr.warning('Quantity must be filled with numeric value.');
      _isValid = false;
    }
    return _isValid;
  }

  //
  private addAllLineLevelSublines(lineItemRef) {
    // console.log('ine item ref is >>>> ', lineItemRef);
    // let _totalCrewCost = 0;
    let _totalSublineCost = 0;
    //
    const subItemsControlsArr = (lineItemRef.get('subLineItems') as FormArray).controls;
    const rowTotalArr = [];
    for (let i = 0; i < subItemsControlsArr.length; i++) {
      // sub line item row level total calculation
      const rowQty = subItemsControlsArr[i].get('quantity').value;
      const rowUntPrice = subItemsControlsArr[i].get('unitPrice').value;
      const rowTotal = rowUntPrice * rowQty;
      // subItemsControlsArr[i].get('totalPrice').patchValue(rowTotal);
      rowTotalArr.push(rowTotal);
      // console.log(rowTotal);
    }
    _totalSublineCost = rowTotalArr.reduce(function(prev, cur) {
      return prev + cur;
    }, 0);
    //
    return _totalSublineCost;
  }

  refreshFormData() {
    this.httpService.getTenderDetailById(this.tenderData._id).subscribe(
      response => {
        // console.log('get API seccess .. ', response);
        this.spinner.hide();
        if (response.status === 200) {
          console.log('refreshFormData :: get API seccess .. ', response);
          this.tenderData = response.body;
          this.masterForm.reset();
          //
          this.hs.updateLocalTenderListByID(this.tenderData);
          this.createSectionsOnGet();
        }
      },
      err => {
        console.log('err ', err);
      }
    );
  }

  // toggles colapse of line item so show subline item
  toggleCollapse(sectionRef, lineItemIndx) {
    //
    const _lineItm = (sectionRef.get('lineItems') as FormArray).at(lineItemIndx).value;
    // console.log(this.masterForm.value);
    this.collapse[lineItemIndx] = !this.collapse[lineItemIndx];
  }

  //
  //  ===========================  COST CALCULATION PART ====================  //
  //

  // all subline items Cost Calculation
  calculateSublineTotal(lineItemRef) {
    //
    let _crewTotalCost = 0;
    const lineValCopy = Object.assign({}, lineItemRef.value);
    const subItemsControlsArr = (lineItemRef.get('subLineItems') as FormArray).controls;
    const rowTotalArr = [];
    for (let i = 0; i < subItemsControlsArr.length; i++) {
      // sub line item row level total calculation
      const rowQty = subItemsControlsArr[i].get('quantity').value;
      const rowUntPrice = subItemsControlsArr[i].get('unitPrice').value;
      const rowTotal = rowUntPrice * rowQty;
      subItemsControlsArr[i].get('totalPrice').patchValue(rowTotal);
      rowTotalArr.push(rowTotal);
      // console.log(rowTotal);
    }
    this.totalSublineCost = rowTotalArr.reduce(function(prev, cur) {
      return prev + cur;
    }, 0);

    // console.log('lineValCopy is ', lineValCopy);
    if (lineValCopy.crewItemRef != null) {
      _crewTotalCost = lineValCopy.crewItemRef.crewTotalCost;
    }
    // cost roll up with crew
    const lineTotalSum = _crewTotalCost + this.totalSublineCost;
    lineItemRef.get('_totalPrice').patchValue(lineTotalSum);
    const unit = (lineItemRef.value._totalPrice / lineItemRef.value.quantity).toFixed(2);
    //
    lineItemRef.get('_unitPrice').patchValue(unit);
  }

  //
  getSubLinesTotalCostOnUpdate(lineItemRef) {
    const subItemsControlsArr = (lineItemRef.get('subLineItems') as FormArray).controls;
    const rowTotalArr = [];
    for (let i = 0; i < subItemsControlsArr.length; i++) {
      // sub line item row level total calculation
      const rowQty = subItemsControlsArr[i].get('quantity').value;
      const rowUntPrice = subItemsControlsArr[i].get('unitPrice').value;
      const rowTotal = rowUntPrice * rowQty;
      subItemsControlsArr[i].get('totalPrice').patchValue(rowTotal);
      rowTotalArr.push(rowTotal);
      // console.log(rowTotal);
    }
    const subTotalCost = rowTotalArr.reduce(function(prev, cur) {
      return prev + cur;
    }, 0);

    return subTotalCost;
  }

  addEditCrewToLine(sectionID, lineItmID, lineItemRef, sectionRef) {
    // this.currentSection = sectionRef;
    // this.currentLineItem = lineItemRef;
    // console.log('this.currentLineItem >>> ', this.currentLineItem);
    //
    const postObj = this.getCrewPostObj();
    postObj.tender = this.tenderData._id;
    postObj.section = sectionID;
    postObj.lineItem = lineItmID;
    postObj.crewItemRef = lineItemRef.value.crewItemRef;
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
        this.calculateSublineTotal(lineItemRef);
        //
        setTimeout(() => {
          this.refreshFormData();
        }, 500);
      }
    });
  }

  // User can create a new Crew Template from here.
  createNewCrew(lineItemRef, i) {
    const modalRef = this.modalService.open(CrewModalComponent, {
      height: 'auto',
      width: '35%',
      data: this.update,
      disableClose: true
    });
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
        console.log(response.data);
      }
      if (response.status === 'add') {
        const crewCtrl = lineItemRef.get('crewItemRef') as FormControl;
        this.crewObj = response.data;
        crewCtrl.setValue(response.data);
        console.log(response);
      }
    });
  }

  deleteCrewFromLine(crewRefParam, lineItemRef) {
    console.log('crewRefParam is ... ', crewRefParam);
    this.httpService.deleteCrewForLineItem(crewRefParam._id).subscribe(
      response => {
        console.log(response);
        if (response.status === 200) {
          this.calculateSublineTotal(lineItemRef);
          setTimeout(() => {
            this.refreshFormData();
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

  //
  //
  onTrenchSelect(tr) {
    this.trenchObj = tr.value;
    console.log(this.trenchObj);
  }
  //
  getTrenchs() {
    this.httpService.getAllTrenchesForOrg().subscribe(
      response => {
        // console.log('success getAllTrenches ', response);
        if (response.status === 201) {
          this.trenchList = response.body;
          // console.log('this.trenchList ', this.trenchList);
        }
      },
      err => {
        console.log('err getAllTrenches ', err);
      }
    );
  }

  addEditTrenchToLine(sectionID, lineItmID, trenchRef) {
    const postObj = this.getTrenchPostObject();
    postObj.tender = this.tenderData._id;
    postObj.section = sectionID;
    postObj.lineItem = lineItmID;
    postObj.hasTrenchRef = trenchRef;
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
      this.spinner.hide();
      if (response.status === 'close' || response.status === undefined) {
        console.log(response.data);
      }
      if (response.status === 'add' || response.status === 'update') {
        this.refreshFormData();
      }
    });
  }

  deleteTrenchFromLine(sectionID, lineId, trenchRefParam) {
    // https://smartbid-api.herokuapp.com/v1/trench/tender/:tenderId/section/:sectionId/lineItem/:lineItemId/trench/:id
    console.log('trench Id is .. ', trenchRefParam);
    this.spinner.show();
    const appendStr =
      'tender/' + this.tenderData._id + '/section/' + sectionID + '/lineItem/' + lineId + '/trench/' + trenchRefParam._id;
    // return;
    this.httpService.deleteTrenchFromLineItem(appendStr).subscribe(
      (response: any) => {
        this.spinner.hide();
        console.log(response);
        // TODO: res status is 201 now - should be 200 from BE team
        if (response.status === 201) {
          this.toastr.info('Trench has been successfully deleted.');
          this.refreshFormData();
        }
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Could not delete Trench. Please try later.');
      }
    );
  }

  // private function returns skeleton object for Trench Post/Put data
  private getTrenchPostObject() {
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
