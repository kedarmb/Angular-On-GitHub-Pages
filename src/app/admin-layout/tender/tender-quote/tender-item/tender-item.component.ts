import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
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
  @Input() selectedSub: any;
  // labourHR= new FormControl();
  displayedColumns: string[] = ['ItemNo', 'SpecNo', 'ItemName', 'Description',
    'Unit', 'Unit-Price', 'Quantity', 'TotalPrice'];
  masterForm: FormGroup; // var to store form
  tender; // model instance
  lineItemsArr: any;
  // collapse: any = {}; // stores value for collapse
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
  crewForm: FormGroup;
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
    // console.log('selectedSub  is ', this.selectedSub);
    // console.log('ngAfterViewInit ::: tender data in child component ', this.tenderData);
    if (this.masterForm == null) {
      this.initMasterForm();
    }
    console.log('ngOnChanges.... ', this.tenderData);
    if (this.tenderData) {
      /* console.log(this.tenderData);
      this.masterForm.patchValue(this.tenderData); */
      if (this.tenderData.sections === null && this.tenderData.sections === []) {
        // open blank master form
      } else if (this.tenderData.sections !== null && this.tenderData.sections !== []) {
        // set value to the form
        // this.masterForm.setControl('sections', this.tenderData.sections);
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
      // totalPrice: [''],
      // subLineItems: this.formBuilder.array([this.initSubLineItemCtrl()]),
      crewChosen: [],
      crewItemRef: [null],
      trenchRef: [null]
    })
  }
  initSubLineItemCtrl() {
    return this.formBuilder.group({
      _id: [''],
      name: [''],
      unit: [''],
      quantity: [''],
      unitPrice: [''],
      // totalPrice: subLineItem.totalPrice,
      // quoteSub: subLineItem.quoteSub,
      subLineTotalPrice: [''],
      subContrctorId: ['']
    })
  }

  //
  createSectionsOnGet() {
    const sections_array = this.masterForm.get('sections') as FormArray;
    // remove the empty element already created:
    while (sections_array.length !== 0) {
      sections_array.removeAt(0);
    }
    //
    this.tenderData.sections.forEach(sectionRef => {
      // console.log('sectionRef is ', sectionRef);
      //
      sections_array.push(this.formBuilder.group({
        _id: sectionRef._id,
        name: sectionRef.name,
        lineItems: this.createLineItemsOnGet(sectionRef)
        // lineItems: this.createLineItemForm(sectionRef)
      }))
    });
    // console.log(this.masterForm);
  }


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
        lineTotalPrice: lineItem.lineTotalPrice,
        crewItemRef: lineItem.crewItemRef,
        crewChosen: [],
        trenchRef: lineItem.trenchRef,
        subLineItems: this.createSubLineItemsOnGet(lineItem)
      }))
    })
    return line_items_array;
  }

  createSubLineItemsOnGet(lineItemRef) {
    const sub_line_array = new FormArray([]);
    lineItemRef.subLineItems.forEach(subLineItem => {
      //
      if (this.selectedSub !== undefined) {
        // console.log(subLineItem.subContrctorId, ' ..... ', this.selectedSub._id);
        if (subLineItem.subContrctorId === this.selectedSub._id) {
          //
          sub_line_array.push(this.formBuilder.group({
            //
            _id: subLineItem._id,
            name: subLineItem.name,
            unit: subLineItem.unit,
            quantity: subLineItem.quantity,
            unitPrice: subLineItem.unitPrice,
            // totalPrice: subLineItem.totalPrice,
            // quoteSub: subLineItem.quoteSub,
            subLineTotalPrice: subLineItem.subLineTotalPrice,
            subContrctorId: subLineItem.subContrctorId
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
        console.log('subItemNode is :  ', subItemNode);
      })
      //
    })
    // console.log(lineItemFormArr);
    return lineItemFormArr;
  }

  //
  __addSection() {
    const sectionsArr = this.masterForm.get('sections') as FormArray;
    const newSection = this.initSectionCtrl();
    sectionsArr.push(newSection);
  }
  __addLineItem(sectionRef) {
    const _lineItem = this.initLineItemCtrl();
    const lineItemArr = sectionRef.get('lineItems') as FormArray;
    lineItemArr.push(_lineItem);
  }

  // saves a single line item
  saveLineItem(sectionRef, indx) {
    // /v1/line-item/tender/:tenderId/section/:sectionId
    // TODO: to add section ID with checking on the append string
    const id = this.tenderData._id;
    // console.log('section ref is ', sectionRef);
    const _lineItm = (sectionRef.get('lineItems') as FormArray).at(indx).value;
    let appendStr = '/tender/' + id + '/section/' + '9e2f4d4ade8a06001ea71e91';
    // trim the payload with necessary key-values for line item only
    const payload = this.hs.pickChosenProps(_lineItm, 'specNo', 'itemNo', 'itemName', 'description', 'unit', 'unitPrice', 'quantity')
    payload['name'] = sectionRef.value.name;
    //
    if (sectionRef.value._id != null) {
      delete payload.name;
      appendStr = '/tender/' + id + '/section/' + sectionRef.value._id;
      // payload._id = sectionRef.value._id;
    }
    //
    // console.log('_lineItm is ... ', _lineItm);
    // return;
    this.spinner.show();
    //
    if (_lineItm._id === null) {
      // this is a new line item .. to save it
      console.log('append string .. ', appendStr);
      this.httpService.saveLineItem(appendStr, payload).subscribe((response) => {
        console.log('success saving line itm ', response);
        this.spinner.hide();
        if (response.status === 201) {
          console.log('line item saved .. calling GET API ...');
          this.toastr.success('Line Item saved.');
          this.refreshFormData();
        }
      },
        (err) => {
          this.spinner.hide();
          console.log('save line itm ERR ', err);
        })
      //
    } else if (_lineItm._id !== null) {
      // this is a saved line item .. to update it
    }

  }
  __removeLineItem(sectionRef, indx) {
    const lineItemArr = sectionRef.get('lineItems') as FormArray;
    if (lineItemArr.length === 1) {
      this.toastr.warning('At least one line item shoud stay', 'Action denied');
      return;
    }
    lineItemArr.removeAt(indx);
  }

  __addSubLineItem(lineItemRef) {
    const _sublineItem = this.initSubLineItemCtrl();
    const sublineItemArr = lineItemRef.get('subLineItems') as FormArray;
    sublineItemArr.push(_sublineItem);
  }
  __removeSubLineItem(lineItemRef, indx) {
    const sublineItemArr = lineItemRef.get('subLineItems') as FormArray;
    sublineItemArr.removeAt(indx);
    // update cost if any
    this.calculateSublineTotal(lineItemRef);
  }

  __saveSubLineItem(sectionRef, lineitemRef, indx) {
    // https://smartbid-api.herokuapp.com/v1/subline-item/tender/5e2ec585703b6b001e358a16/section/5e2ec64b703b6b001e358a17/lineItem/5e2ec860703b6b001e358a19
    const id = this.tenderData._id;
    const secID = sectionRef.value._id;
    const lineID = lineitemRef.value._id;
    const appendStr = '/tender/' + id + '/section/' + secID + '/lineItem/' + lineID;
    // console.log('appendStr  is:  ', appendStr);
    const _subLineItem = (lineitemRef.get('subLineItems') as FormArray).at(indx).value;
    const payload = this.hs.pickChosenProps(_subLineItem, 'name', 'unit', 'quantity', 'unitPrice', 'subLineTotalPrice');
    console.log('appendStr  is:  ', appendStr);
    console.log('payload is..  ', payload);
    this.httpService.saveSubLineItem(appendStr, payload).subscribe((response) => {
      console.log('succ in saving subline item ', response);
    },
      (err) => {
        console.log('err in saving subl ine  item ', err);
      })
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
    const _lineItm = (sectionRef.get('lineItems') as FormArray).at(lineItemIndx).value;
    // console.log(_lineItm)
    if (_lineItm._id == null) {
      this.toastr.warning('Line item must be saved before a Subline Item is created', 'Action denied');
      return;
    }
    // console.log(this.collapse[lineItemIndx], ' .. , .. ', this.collapse);
    this.collapse[lineItemIndx] = !this.collapse[lineItemIndx]
  }

  save() {
    if (this.tender._id) {
      /* this.tenderService.update(this.tender).subscribe(() => {
        this.tenderService.getTenderById(this.tender._id).subscribe((tender) => {
          // this.tender = tender;
        })
      }) */
    } else {
      /* this.tenderService.add(this.tender).subscribe(() => {
        this.tenderService.getTenderById(this.tender._id).subscribe((tender) => {
          // this.tender = tender;
        })
      }) */
      console.log(this.masterForm.value);
    }
  }


  /*  checkIfCrewAvailable(lineItemRef) {
     const crewCtrlVal = lineItemRef.get('crewChosen').value;
     let show = true;
     if (crewCtrlVal === null) {
       show = false;
     }
     return show;
   } */
  /* getLaboursArr(lineItemRef) {
    const crwCtrl = lineItemRef.get('crewChosen').value; // returns FromGroup
    const lbrCtrlsArr = crwCtrl.get('labours').controls;
    // .controls['labours'];
    // console.log('aarr isssss   ', lbr, ' .. length is ');
    return lbrCtrlsArr;
  } */


  saveSelectedCrew(lineItemRef, lindx) {
    const crewRef = lineItemRef.controls['crewItemRef'].value;
    // (lineItemRef.get('crewItemRef') as FormArray).at(lindx).value;

    console.log(crewRef);

  }
  //
  //  ===========================  COST CALCULATION PART ====================  //
  //
  // line item calculation
  calculateLineItemUnitPrice(lineItemRef) {
    console.log(lineItemRef.controls['quantity'].value, lineItemRef.controls['lineTotalPrice'].value);
    const lineQty = lineItemRef.controls['quantity'].value;
    const lineTotal = lineItemRef.controls['lineTotalPrice'].value;
    const lineUnit = Math.floor(lineTotal / lineQty).toFixed(2);
    lineItemRef.controls['unitPrice'].patchValue(lineUnit);
  }
  // all subline items Cost Calculation
  calculateSublineTotal(lineItemRef) {
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
    this.totalSublineCost = rowTotalArr.reduce(function (prev, cur) {
      return prev + cur;
    }, 0);

    // console.log('group total is ', this.totalSublineCost);
    // cost roll up with crew
    const lineTotalSum = this.totalCrewCost + this.totalSublineCost
    lineItemRef.get('lineTotalPrice').patchValue(lineTotalSum);
    const unit = lineItemRef.value.lineTotalPrice / lineItemRef.value.quantity;
    lineItemRef.get('unitPrice').patchValue(unit);
  }

  addCrewToLine(sectionID, lineItmID) {
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
        console.log(response.data);
      } if (response.status === 'add') {
        this.refreshFormData();
      }
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

  addNewTrench(lineItem, lindx) {
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
        /* const crewCtrl = lineItemRef.get('crewItemRef') as FormControl;
        this.crewObj = response.data;
        crewCtrl.setValue(response.data); */
        console.log(response);
      }
    });
  }
  saveTrench(sectionRef, lineItemRef, lindx) {
    // /v1/trench/tender/:tenderId/section/:sectionId/lineItem/:lineItemId
    const id = this.tenderData._id;
    const secID = sectionRef.value._id;
    const lineID = lineItemRef.value._id;
    const appendStr = '/tender/' + id + '/section/' + secID + '/lineItem/' + lineID;
    // console.log('append string ', appendStr);
    // console.log('payload is : ', this.trenchObj);
    //
    this.httpService.saveTrenchForLineItem(appendStr, this.trenchObj).subscribe((response) => {
      console.log('success ', response);
    }, (err) => {
      console.log('err saving trench ', err);
    })
  }
}



