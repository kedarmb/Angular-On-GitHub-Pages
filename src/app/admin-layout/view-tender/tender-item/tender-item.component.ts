import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpService } from 'app/shared/core/service/http.service';
import { NgProgressComponent, NgProgressRef, NgProgress } from '@ngx-progressbar/core';
import { MatDialog } from '@angular/material';
import { CrewModalComponent } from '../../../shared/components/crew-modal/crew-modal.component';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'app/shared/core/service/helper.service';


@Component({
  selector: 'app-tender-item',
  templateUrl: './tender-item.component.html',
  styleUrls: ['./tender-item.component.scss']
})
export class TenderItemComponent implements OnInit, OnChanges {
  @Input() tenderData: any;
  displayedColumns: string[] = ['ItemNo', 'SpecNo', 'ItemName', 'Description',
    'Unit', 'Unit-Price', 'Quantity', 'TotalPrice'];
  masterForm: FormGroup; // var to store form
  tender; // model instance
  lineItemsArr: any;
  collapse: any = {}; // stores value for collapse
  lineItemTotal: any;
  crewList: any[];
  progressRef: NgProgressRef;
  crewObj = {}
  //
  update = {
    data: '',
    val: ''
  };
  //
  constructor(private formBuilder: FormBuilder, private modalService: MatDialog,
    private progress: NgProgress, private httpService: HttpService, private hs: HelperService,
    private toastr: ToastrService) {
    //
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    this.progressRef.start();
    this.getCrews();
  }

  ngOnChanges() {
    console.log('ngAfterViewInit ::: tender data in child component ', this.tenderData);
    this.initMasterForm();
  }

  // creating masterform
  initMasterForm() {
    this.masterForm = this.formBuilder.group({
      _id: [''],
      clientName: [''],
      name: [''],
      description: [''],
      openDate: [''],
      closeDate: [''],
      quoteStartDate: [''],
      quoteEndDate: [''],
      sections: this.formBuilder.array([this.initSectionCtrl()])
    })
    console.log(this.masterForm);
  }

  initSectionCtrl() {
    return this.formBuilder.group({
      name: [''],
      totalPrice: [''],
      lineItems: this.formBuilder.array([this.initLineItemCtrl()])
    })
  }
  initLineItemCtrl() {
    return this.formBuilder.group({
      specNo: [''],
      itemNo: [''],
      name: [''],
      description: [''],
      unit: [''],
      unitPrice: [''],
      quantity: [''],
      totalPrice: [''],
      subLineItems: this.formBuilder.array([this.initSubLineItemCtrl()]),
      crewItemRef: [''],
      trenchRef: ['']
    })
  }
  initSubLineItemCtrl() {
    return this.formBuilder.group({
      name: [''],
      unit: [''],
      quantity: [''],
      unitPrice: [''],
      totalPrice: [''],
      quoteSub: ['']

    })
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

  // to calculate line items fro form
  calculateLineitem(i) {
    let total: any;
    const ctrl = this.masterForm.get('items')['controls'][i]
    total = ctrl.get('quantity').value * ctrl.get('unitPrice').value;
    if (!total) {
      total = 0;
    }
    ctrl.get('totalPrice').patchValue(total)
  }

  // to calculate subline items fro form
  calculatesubLineitem(i, j) {
    let subTotal: any;
    const ctrl = this.masterForm.get('items')['controls'][i];
    const subCtrl = ctrl.get('subitems')['controls'][j];
    subTotal = subCtrl.get('unitPrice').value * subCtrl.get('quantity').value;
    if (!subTotal) {
      subTotal = 0;
    }
    subCtrl.get('totalPrice').patchValue(subTotal)
  }

  allLineItemCost(i) {
    console.log('hello', i)
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
    }

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
        console.log(response);
        if (response.status === 200) {
          this.crewList = response.body;
          console.log(this.crewList)
          this.progressRef.complete();
        }
      },
        error => {
          console.log(error);
        }
      )
  };
}
