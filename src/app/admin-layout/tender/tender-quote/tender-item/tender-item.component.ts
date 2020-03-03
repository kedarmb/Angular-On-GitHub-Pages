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
import { LineItemCrewComponent } from 'app/shared/components/line-item-crew/line-item-crew.component'
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-tender-item',
  templateUrl: './tender-item.component.html',
  styleUrls: ['./tender-item.component.scss']
})
export class TenderItemComponent implements OnInit, OnChanges {
  @Input() tenderData: any;
  @Input() selectedSubInp: any;
  // labourHR= new FormControl();
  displayedColumns: string[] = ['ItemNo', 'SpecNo', 'ItemName', 'Description',
    'Unit', 'Unit-Price', 'Quantity', 'TotalPrice'];
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
  constructor(private formBuilder: FormBuilder, private modalService: MatDialog,
    private progress: NgProgress, private httpService: HttpService, private hs: HelperService,
    private toastr: ToastrService, private ts: TenderService, private spinner: NgxSpinnerService, ) {
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
    })
    // console.log(this.masterForm);
  }

  initSectionCtrl() {
    return this.formBuilder.group({
      _id: [null],
      name: [''],
      sectionTotalPrice: [''],
      lineItems: this.formBuilder.array([this.initLineItemCtrl()])
    })
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
    })
  }
  initSubLineItemCtrl() {
    return this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      // totalPrice: subLineItem.totalPrice,
      // quoteSub: subLineItem.quoteSub,
      totalPrice: [''],
      subContractorId: ['']
    })
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
      sections_array.push(this.formBuilder.group({
        _id: sectionRef._id,
        name: sectionRef.name,
        lineItems: this.createLineItemsOnGet(sectionRef)
      }))
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
      line_items_array.push(this.formBuilder.group({
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
        _totalPrice: this.returnLineTotalPrice(lineItem.lineTotalPrice, 'totalPrice', lineItem),
        _unitPrice: this.returnLineUnitPrice(lineItem.lineTotalPrice, 'unitPrice', lineItem),
        crewItemRef: lineItem.crewItemRef,
        crewChosen: [],
        trenchRef: lineItem.trenchRef,
        subLineItems: this.createSubLineItemsOnGet(lineItem)
      }))
    })
    return line_items_array;
  }

  createLineTotalPriceArrOnGet(priceArr) {
    const lineTotalArr = new FormArray([]);
    priceArr.forEach(item => {
      lineTotalArr.push(this.formBuilder.group({
        unitPrice: Math.floor(item.unitPrice).toFixed(2),
        totalPrice: item.totalPrice,
        quoteSub: item.quoteSub,
        _id: item._id
      }))
    })
    return lineTotalArr;
  }

  private returnLineTotalPrice(totalPricesArr, prop, lineItemRef) {
    let propVal = 0;
    let crewVal = 0;
    let total = 0;
    if (this.selectedSubInp != undefined) {
      // user comes to this page & selects one SubC.
      for (let i = 0; i < totalPricesArr.length; i++) {
        if (totalPricesArr[i].quoteSub === this.selectedSubInp._id) {
          propVal = totalPricesArr[i][prop];
          break;
        }
      }
    }
    //
    if (lineItemRef.crewItemRef != null) {
      crewVal = lineItemRef.crewItemRef.crewTotalCost;
    }
    total = propVal + crewVal;
    return total;
  }
  private returnLineUnitPrice(totalPricesArr, prop, lineItemRef) {
    let propVal = 0;
    let crewVal = 0;
    let total = 0;
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
    // console.log('totalCrewSubs ... ', totalCrewSubs);
    total = Number(Math.floor(totalCrewSubs / lineItemRef.quantity).toFixed(2));
    // console.log('total ... ', total, lineItemRef.quantity);
    // console.log('................')
    // TODO - Lineitem Quantity can not be empty -- jugar to fix
    if (lineItemRef.quantity == null) {
      total = 0;
    }
    return total;
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
          sub_line_array.push(this.formBuilder.group({
            //
            _id: subLineItem._id,
            name: subLineItem.name,
            unit: subLineItem.unit,
            quantity: subLineItem.quantity,
            unitPrice: subLineItem.unitPrice,
            totalPrice: subLineItem.totalPrice,
            subContractorId: subLineItem.subContractorId
          }))
        }
      }
      //
    })
    return sub_line_array;
  }
  //

  createLineItemForm(sectionRef) {
    // console.log('sectionRef:  ', sectionRef.lineItems as FormArray);
    let lineItemFormArr: FormArray = sectionRef.lineItems as FormArray;
    lineItemFormArr = this.formBuilder.array([]);
    //
    sectionRef.lineItems.forEach((item) => {
      lineItemFormArr.push(this.ts.createItemCtrl(item));
      //
      let subItemNode: FormArray = item.subLineItems as FormArray;
      subItemNode = new FormArray([]);
      //
      item.subLineItems.forEach((subItem) => {
        // console.log(subItem)
        subItemNode.push(this.ts.createSublineItemsCtrls(subItem));
        // console.log('subItemNode is :  ', subItemNode);
      })
      //
    })
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
    sublineItemArr.removeAt(indx);
    // update cost if any
    this.calculateSublineTotal(lineItemRef);
    this.toastr.info('not deleted from database. Functionality under development', 'Dlelete Action');
  }


  __saveSubLineItem(sectionRef, lineitemRef, indx) {
    //
    const id = this.tenderData._id;
    const secID = sectionRef.value._id;
    const lineID = lineitemRef.value._id;
    let appendStr = '/tender/' + id + '/section/' + secID + '/lineItem/' + lineID;
    //
    const _sublineQuote = Object.assign({}, (lineitemRef.get('subLineItems') as FormArray).at(indx).value);
    // console.log('subline item before saving ...', _sublineQuote);
    //
    _sublineQuote['subContractorId'] = this.selectedSubInp._id;
    //
    // console.log((lineitemRef.get('subLineItems') as FormArray).invalid);
    if ((lineitemRef.get('subLineItems') as FormArray).invalid) {
      this.toastr.warning('Name, Unit, Quantity & Unit Price must be filled to save', 'Action denied.');
      return;
    }
    //
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
      unitPrice: Math.floor(lineitemRef.value.unitPrice).toFixed(2),
      totalPrice: this.addAllLineLevelSublines(lineitemRef),
      quoteSub: this.selectedSubInp._id,
      _id: lineTotal_id
    }
    // if _id undefined ..i.e first subline to add - delete it
    if (lineItemData._id === undefined) {
      delete lineItemData._id;
    }
    //
    const finalPayload = {
      sublineItem: _sublineQuote,
      lineTotalPrice: lineItemData
    }
    // console.log('finalPayload is..  ', finalPayload);
    // return;
    if (_sublineQuote._id == '') {
      // no _id .. fresh subline item to POST
      delete _sublineQuote._id;
      this.httpService.saveSubLineItem(appendStr, finalPayload).subscribe((response) => {
        console.log('succ in saving subline item ', response);
        if (response.status === 201) {
          this.toastr.success('Successfully saved Subline Item.');
          this.refreshFormData();
        }
      },
        (err) => {
          this.toastr.error('Error in saving Subline item. Try later');
          console.log('err in saving subl ine  item ', err);
        })
    } else if (_sublineQuote._id != '') {
      // post API to call to update existing subline item
      // console.log('PUT for subline ... ', appendStr);
      // console.log(JSON.stringify(finalPayload));
      appendStr = '/' + _sublineQuote._id + '/tender/' + id + '/section/' + secID + '/lineItem/' + lineID;
      this.httpService.updateSubLineItem(appendStr, finalPayload).subscribe((response) => {
        console.log('succ in saving subline item ', response);
        if (response.status === 200) {
          this.toastr.info('Successfully updated Subline Item.');
          this.refreshFormData();
        }
      },
        (err) => {
          this.toastr.error('Error in updating Subline item. Try later');
          console.log('err in saving subl ine  item ', err);
        })
    }

  }

  private addAllLineLevelSublines(lineItemRef) {
    console.log('ine item ref is >>>> ', lineItemRef);
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
      subItemsControlsArr[i].get('totalPrice').patchValue(rowTotal);
      rowTotalArr.push(rowTotal);
      // console.log(rowTotal);
    }
    _totalSublineCost = rowTotalArr.reduce(function (prev, cur) {
      return prev + cur;
    }, 0);
    //
    return _totalSublineCost;
  }

  /* private checkSublineIfEmpty(payload) {
    let foundEmpty = false;
    for (const key in payload) {
      if (payload[key] === '') {
        foundEmpty = true;
        break;
      }
    }
    return foundEmpty;
  } */

  private addAllSubLineAndCrew(lineItemRef) {
    console.log('ine item ref is >>>> ', lineItemRef);
    let _totalCrewCost = 0;
    let _totalSublineCost = 0;
    //
    const subItemsControlsArr = (lineItemRef.get('subLineItems') as FormArray).controls;
    const rowTotalArr = [];
    for (let i = 0; i < subItemsControlsArr.length; i++) {
      // sub line item row level total calculation
      const rowQty = subItemsControlsArr[i].get('quantity').value;
      const rowUntPrice = subItemsControlsArr[i].get('unitPrice').value;
      const rowTotal = rowUntPrice * rowQty;
      subItemsControlsArr[i].get('subLineTotalPrice').patchValue(rowTotal);
      rowTotalArr.push(rowTotal);
      // console.log(rowTotal);
    }
    _totalSublineCost = rowTotalArr.reduce(function (prev, cur) {
      return prev + cur;
    }, 0);
    console.log('lineItemRef.value.crewItemRef.crewTotalCost ', lineItemRef.value.crewItemRef.crewTotalCost);
    if (lineItemRef.value.crewItemRef.crewTotalCost !== undefined) {
      _totalCrewCost = lineItemRef.value.crewItemRef.crewTotalCost;
    }
    // console.log('group total is ', this.totalSublineCost);
    // cost roll up with crew
    const lineTotalSum = _totalCrewCost + _totalSublineCost;
    // console.log('calculated sub total ', _totalSublineCost);
    return lineTotalSum;
  }

  private checkSublineIfEmpty(payload) {
    let foundEmpty = false;
    for (const key in payload) {
      if (payload[key] === '') {
        foundEmpty = true;
        break;
      }
    }
    return foundEmpty;
  }

  refreshFormData() {
    this.httpService.getTenderDetailById(this.tenderData._id).subscribe((response) => {
      // console.log('get API seccess .. ', response);
      if (response.status === 200) {
        console.log('refreshFormData :: get API seccess .. ', response);
        this.tenderData = response.body;
        this.masterForm.reset();
        //
        this.hs.updateLocalTenderListByID(this.tenderData);
        this.createSectionsOnGet();
      }
    }, (err) => {
      console.log('err ', err);
    })
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
  // line item calculation
  calculateLineItemUnitPrice(lineItemRef) {
    // console.log(lineItemRef.controls['quantity'].value, lineItemRef.controls['lineTotalPrice'].value);
    const lineQty = lineItemRef.controls['quantity'].value;
    const lineTotal = lineItemRef.controls['lineTotalPrice'].value;
    const lineUnit = Math.floor(lineTotal / lineQty).toFixed(2);
    lineItemRef.controls['unitPrice'].patchValue(lineUnit);
  }

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
    this.totalSublineCost = rowTotalArr.reduce(function (prev, cur) {
      return prev + cur;
    }, 0);

    // console.log('lineValCopy is ', lineValCopy);
    if (lineValCopy.crewItemRef != null) {
      _crewTotalCost = lineValCopy.crewItemRef.crewTotalCost;
    }
    // cost roll up with crew
    const lineTotalSum = _crewTotalCost + this.totalSublineCost;
    lineItemRef.get('_totalPrice').patchValue(lineTotalSum);
    const unit = lineItemRef.value._totalPrice / lineItemRef.value.quantity;
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
    const subTotalCost = rowTotalArr.reduce(function (prev, cur) {
      return prev + cur;
    }, 0);

    return subTotalCost;
  }

  addCrewToLine(sectionID, lineItmID, lineItemRef, sectionRef) {
    this.currentSection = sectionRef;
    this.currentLineItem = lineItemRef;
    // console.log('this.currentLineItem >>> ', this.currentLineItem);
    //
    const postIds = {
      tender: this.tenderData._id, section: sectionID, lineItem: lineItmID,
      crewLabourEquipment: null, labourTotalCost: null,
      equipmentTotalCost: null, crewTotalCost: null, organizationId: null,
      labourArr: null, equipmentArr: null
    }
    const modalRef = this.modalService.open(LineItemCrewComponent, {
      height: 'auto',
      width: '65%',
      data: postIds,
      disableClose: true,
      maxHeight: '95vh',
    });
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
        // console.log(response.data);
      } if (response.status === 'add') {
        // console.log('crew resp... ', response);
        this.totalCrewCost = response.totalCost;
        this.calculateSublineTotal(lineItemRef);
        //
        setTimeout(() => {
          // this.silentUpdateLineCost();
          this.refreshFormData();
        }, 500)
      }
    })
  }

  private silentUpdateLineCost() {
    console.log('silentUpdateLineCost INVOKED');
    const id = this.tenderData._id;
    const _lineItm = this.currentLineItem.value;
    const appendStr = '/' + _lineItm._id + '/tender/' + id + '/section/' + this.currentSection.value._id;
    // trim the payload with necessary key-values for line item only
    const payload = this.hs.pickChosenProps(_lineItm, 'specNo', 'itemNo', 'itemName', 'description', 'unit', 'unitPrice', 'quantity')
    //
    this.httpService.updateLineItem(appendStr, payload).subscribe((response) => {
      console.log('silentUpdateLineCost ', response);
      // this.spinner.hide();
      if (response.status === 200) {
        //
        console.log('silentUpdateLineCost SUCCESS');
        this.refreshFormData();
      }
    },
      (err) => {
        this.spinner.hide();
        console.log('save line itm ERR ', err);
      })
  }


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

  //
  //
  onTrenchSelect(tr) {
    this.trenchObj = tr.value;
    console.log(this.trenchObj);
  }
  //
  getTrenchs() {
    this.httpService.getAllTrenchesForOrg().subscribe((response) => {
      // console.log('success getAllTrenches ', response);
      if (response.status === 201) {
        this.trenchList = response.body;
        // console.log('this.trenchList ', this.trenchList);
      }
    }, (err) => {
      console.log('err getAllTrenches ', err);
    })
  }

  addTrenchToLine(sectionID, lineItmID) {
    const postTrenchIds = {
      tender: this.tenderData._id, section: sectionID, lineItem: lineItmID,
      calculationName: null, beddingLength: null, beddingWidth: null, beddingHeight: null,
      beddingVolume: null, beddingWeight: null, pipeDiameter: null, pipeVolume: null,
      pipeHeight: null, effectiveVolume: null, backfillDensity: null, densityBedding: null,
      backfillLength: null, backfillWidth: null, backfillVolume: null, backfillHeight: null,
      backfillWeight: null
    }
    const modalRef = this.modalService.open(TrenchModalComponent, {
      height: 'auto',
      width: '65%',
      data: postTrenchIds,
      disableClose: true,
      maxHeight: '95vh',
    });
  }

  addNewTrench(lineItem, lindx, section) {
    this.update.data = this.tenderData;
    const modalRef = this.modalService.open(TrenchModalComponent, {
      height: 'auto',
      width: 'auto',
      maxHeight: '95vh',
      data: this.update,
      disableClose: true
    });
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
        console.log(response.data);
      }
      if (response.status === 'add') {
        const trenchCtrl = lineItem.get('trenchRef') as FormControl;
        this.trenchObj = response.data;
        trenchCtrl.setValue(response.data);
        console.log(response);
      }
    });
  }

  saveTrench(section, lineItem) {
    // /v1/trench/tender/:tenderId/section/:sectionId/lineItem/:lineItemId
    const id = this.tenderData._id;
    const secID = section.value._id;
    const lineID = lineItem.value._id;
    // console.log("HHHHHHHHHHHH", lineID)
    const appendStr = '/tender/' + id + '/section/' + secID + '/lineItem/' + lineID;
    // console.log('append string ', appendStr);
    // console.log('payload is : ', this.trenchObj);
    //
    return;
    // this.httpService.saveTrenchForLineItem(appendStr).subscribe((response) => { 
    //   console.log('success ', response); 
    // }, (err) => { 
    //   console.log('err saving trench ', err); 
    // })
  }
}



