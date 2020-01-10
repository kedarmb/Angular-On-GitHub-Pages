import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TenderService } from '../../../shared/core/service/tender.service';
import { HttpService } from 'app/shared/core/service/http.service';
import { NgProgressComponent, NgProgressRef, NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-tender-item',
  templateUrl: './tender-item.component.html',
  styleUrls: ['./tender-item.component.scss']
})
export class TenderItemComponent implements OnInit {
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
  //
 /*  private ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' }
  ]; */
  // crewCtrl = new FormControl(null, []);
  constructor(private formBuilder: FormBuilder,
    private progress: NgProgress, private spinner: NgxSpinnerService,
    private ts: TenderService, private httpService: HttpService) { }

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    this.progressRef.start();
    this.getMasterForm();
    this.getCrewData()
  }

  // creating masterform
  getMasterForm() {
    this.masterForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
  }

  // this adds data to html of form group and its array
  createLineItemForm() {
    this.tenderData.items.forEach((item, index) => {
      const lineItemFormArr = this.masterForm.get('items') as FormArray;
      lineItemFormArr.push(this.ts.createItemCtrl(item));
      item.subitems.forEach((subItem, subItemIndex) => {
        const subItemNode: FormArray = (<FormArray>lineItemFormArr.controls[index].get('subitems'))
        subItemNode.push(this.ts.createSublineItemsCtrls(subItem));
      })

    })
  }

  getEmptySublineItem() {
    const subIlineItm = this.formBuilder.group({
      // id: '',
      name: '',
      unit: '',
      unitPrice: '',
      quantity: '',
      totalPrice: ''
    })
    return subIlineItm
  }
  addLineItem() {
    // adds dummy values to form
    const lineItm = this.formBuilder.group({
      itemNo: [''],
      specNo: [''],
      itemName: [''],
      description: [''],
      unit: [''],
      unitPrice: [''],
      quantity: [''],
      totalPrice: [''],
      subitems: this.formBuilder.array([this.ts.createSublineItemsCtrls(this.getEmptySublineItem())]),
      crewRef: ['']
    });
    const lineItemsArr = this.masterForm.get('items') as FormArray;
    lineItemsArr.push(lineItm);
    // console.log(lineItemsArr);
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
    if (l.length == 0 && K.length == 0) {
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

  // adds line item to masterform from html
  add() {
    this.addLineItem();
    console.log(this.masterForm.value)
  }
  removeLineItem(i) {
    const ctrl = this.masterForm.get('items') as FormArray;
    ctrl.removeAt(i);
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

  addSubLineItem(i) {
    const ctrl = this.masterForm.get('items')['controls'][i];
    const subCtrl = ctrl.get('subitems') as FormArray;
    subCtrl.push(this.getEmptySublineItem());
  }

  removeSublineItem(i, j) {
    const ctrl = this.masterForm.get('items')['controls'][i];
    const subCtrl = ctrl.get('subitems') as FormArray;
    console.log(ctrl);
    subCtrl.removeAt(j);
  }

  delete(item) {
    this.tender.items = this.tender.items.filter((v) => {
      if (v.id === item.id) {
        return false;
      } else {
        return true;
      }
    })
  }
  getCrewData() {
    console.log('getCrewData invoked...')
    this.httpService.getAllCrews()
      .subscribe((response: any) => {
        // console.log(response);
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
