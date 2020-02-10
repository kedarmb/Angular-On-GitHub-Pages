import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpService } from '../../../../shared/core/service/http.service';
import { NgProgressComponent, NgProgressRef, NgProgress } from '@ngx-progressbar/core';
import { MatDialog } from '@angular/material';
import { CrewModalComponent } from '../../../../shared/components/crew-modal/crew-modal.component';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../../shared/core/service/helper.service';
import { TenderService } from '../../../../shared/core/service/tender.service';
import { arrayToHash } from '@fullcalendar/core/util/object';
import { TrenchModalComponent } from 'app/shared/components/trench-modal/trench-modal.component';
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
  crewList: any[];
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
  totalCrewCost = 0;
  eObj: any;
  actionStr = 'Operation under process';
  //

  //
  constructor(private formBuilder: FormBuilder, private modalService: MatDialog,
    private progress: NgProgress, private httpService: HttpService, private hs: HelperService,
    private toastr: ToastrService, private ts: TenderService, private spinner: NgxSpinnerService, ) {
    //
  }

  ngOnInit() {
    // this.progressRef = this.progress.ref('myProgress');
    // this.progressRef.start();
    this.getCrews();
    this.getTrenchs();
  }

  ngOnChanges() {
    // console.log('selectedSub  is ', this.selectedSub);
    // console.log('ngAfterViewInit ::: tender data in child component ', this.tenderData);
    if (this.masterForm == null) {
      this.initMasterForm();
    }
    // console.log(this.tenderData);
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
    console.log('section ref is ', sectionRef);
    const _lineItm = (sectionRef.get('lineItems') as FormArray).at(indx).value;
    let appendStr = '/tender/' + id + '/section/' + '9e2f4d4ade8a06001ea71e91';
    // trim the payload with necessary key-values for line item only
    const payload = this.hs.pickChosenProps(_lineItm, 'specNo', 'itemNo', 'itemName', 'description', 'unit', 'unitPrice', 'quantity')
    // console.log(sectionRef.value.name);
    payload['name'] = sectionRef.value.name;
    //
    if (sectionRef.value._id != null) {
      delete payload.name;
      appendStr = '/tender/' + id + '/section/' + sectionRef.value._id;
      // payload._id = sectionRef.value._id;
    }
    // console.log('final pay load is ', payload);
    // console.log('append ', appendStr);
    //
    // return;

    this.spinner.show();
    this.httpService.saveLineItem(appendStr, payload).subscribe((response) => {
      console.log('success saving line itm ', response);
      this.spinner.hide();
      if (response.status === 201) {
        console.log('line item saved .. calling GET API ...')
        this.refreshFormData();
      }
    },
      (err) => {
        this.spinner.hide();
        console.log('save line itm ERR ', err);
      })
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
        console.log('get API seccess .. ', response);
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

  // to calculate line items fro form
  calculateLineitem(lineitemRef, i) {
    // let total: any;
    // console.log(lineitemRef);
    // const ctrl = lineitemRef['controls'][i];
    // console.log(ctrl, ctrl.value);
    // const ctrl = this.masterForm.get('items')['controls'][i]
    /* total = ctrl.get('quantity').value * ctrl.get('unitPrice').value;
    if (!total) {
      total = 0;
    }
    ctrl.get('totalPrice').patchValue(total) */
  }


  // to calculate subline items fro form
  calculatesubLineitem(i, j) {
    /* let subTotal: any;
    const ctrl = this.masterForm.get('items')['controls'][i];
    const subCtrl = ctrl.get('subitems')['controls'][j];
    subTotal = subCtrl.get('unitPrice').value * subCtrl.get('quantity').value;
    if (!subTotal) {
      subTotal = 0;
    }
    subCtrl.get('totalPrice').patchValue(subTotal) */
  }

  allLineItemCost(i) {
    /* console.log('hello', i)
    let allTotal: any;
    const ctrl = this.masterForm.get('items');
    let subCtrlVal;
    const K = ctrl.value.map(val => {
      val.subitems.map(subval => {
        subCtrlVal = subval.totalPrice;
        // console.log(subCtrlVal);
      })
      return val.totalPrice
    })
    const l = ctrl.value.map(val => {
      const sIVal = val.subitems.map(subval => {
        return subCtrlVal = subval.totalPrice;
      })
      if (sIVal.length > 1) {
        const slt = sIVal.reduce((valSi: any, index: any) => {
          return valSi + index;
        })
      }
      // console.log(slt)
      return sIVal;
    })
    console.log(l.flat());
    if (l.length === 0 && K.length === 0) {
      this.lineItemTotal = 0;
    }
    if (l.length !== 0 && K.length !== 0) {

      let lineTotal = K.reduce((val, index) => {
        return val + index;
      })
      // console.log(ctrl.value[])
      let subLineTotal;
      let slt
      subLineTotal = l.flat().reduce((val, index) => {
        return val + index;
      })
      slt = subLineTotal = + subLineTotal;

      const lt = lineTotal = + lineTotal;
      this.lineItemTotal = lt + slt;
    }
    if (!allTotal) {
      allTotal = 0;
    } */

  }
  // toggles colapse of line item so show subline item
  toggleCollapse(index) {
    this.collapse[index] = !this.collapse[index]
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
  onCrewSelect(evt) {
    console.log(evt);
    this.crewObj = evt.value;
    this.cObj = this.crewObj['labours'].map(e => {
      return e.hrs = 0;
    })
    this.eObj = this.crewObj['equipments'].map(e => {
      return e.hrs = 0;
    })
    // console.log(this.crewObj);
  }

  labourHourAdd(lineItemRef, itemRef) {
    /* this.totalCrewCost += (itemRef.hrs * itemRef.hourlyRate);
    // const val = this.totalCrewCost + lineItemRef.value.lineTotalPrice;
    lineItemRef.get('lineTotalPrice').patchValue(this.totalCrewCost);
    const unit = lineItemRef.value.lineTotalPrice / lineItemRef.value.quantity;
    //
    lineItemRef.get('unitPrice').patchValue(unit); */
  }

  equipmentAdd(lineItemRef, itemRef) {
    /* this.totalCrewCost += (itemRef.hrs * itemRef.hourlyRate);
    // const val = this.totalCrewCost + lineItemRef.value.lineTotalPrice;
    lineItemRef.get('lineTotalPrice').patchValue(this.totalCrewCost);
    const unit = lineItemRef.value.lineTotalPrice / lineItemRef.value.quantity;
    lineItemRef.get('unitPrice').patchValue(unit); */
  }

  onCrewHoursAdd(lineItemRef) {
    let _totalLaborCost = 0;
    let _totalEquipmentCost = 0;
    // let _totalCrewCost = 0;
    //
    for (let i = 0; i < this.crewObj['labours'].length; i++) {
      const hourlyCost = this.crewObj['labours'][i].hrs * this.crewObj['labours'][i].hourlyRate;
      _totalLaborCost += hourlyCost;
    }
    //
    for (let i = 0; i < this.crewObj['equipments'].length; i++) {
      const hourlyCost = this.crewObj['equipments'][i].hrs * this.crewObj['equipments'][i].hourlyRate;
      _totalEquipmentCost += hourlyCost;
    }
    this.totalCrewCost = _totalEquipmentCost + _totalLaborCost;
    //
    console.log('totalLaborCost ', _totalLaborCost);
    console.log('totalEquipmentCost ', _totalEquipmentCost);
    lineItemRef.get('lineTotalPrice').patchValue(this.totalCrewCost);
    const unit = lineItemRef.value.lineTotalPrice / lineItemRef.value.quantity;
    lineItemRef.get('unitPrice').patchValue(unit);
  }

  onTrenchSelect(tr) {
    this.trenchObj = tr.value;
    console.log(this.trenchObj);
  }
  addNewCrew(lineItemRef, index) {
    // console.log(lineItemRef.get('crewItemRef') as FormControl);
    this.openCrewAddModal(lineItemRef, index);
  }
  openCrewAddModal(lineItemRef, i) {
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
  getCrews() {
    this.httpService.getAllCrews()
      .subscribe((response: any) => {
        // console.log(response);
        if (response.status === 200) {
          this.crewList = response.body;
          // console.log(this.crewList)
          // this.progressRef.complete();
        }
      },
        error => {
          console.log(error);
        }
      )
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
      width: '65%',
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


/* createLineItemForm(sectionRef) {
    let j = this.formBuilder.group({
      lineItems: this.formBuilder.array(sectionRef.lineItems)
    })
    const k = j.get('lineItems') as FormArray
    while (k.length !== 0) {
      k.removeAt(0);
    }
    const arr = []
    sectionRef.lineItems.forEach((item) => {

      console.log(k);
      k.push(this.ts.createItemCtrl(item));
      const subItemNode: FormArray = item.subLineItems as FormArray;
      console.log(sub);
      console.log(k);
    })
    return k;
  } */
/* createSUblineItem(subItem){
  const sub = subItem.subLineItems.forEach((subItem) => {
    console.log(subItem)
    subItemNode.push(this.ts.createSublineItemsCtrls(subItem));
    console.log('subItemNode is :  ', subItemNode);
    return subItemNode;
  })

} */
