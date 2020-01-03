import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Observable, Subject, merge, ReplaySubject } from 'rxjs';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TenderService } from '../../../shared/core/service/tender.service';
import { Tender } from '../../../shared/core/model/tender.model';

@Component({
  selector: 'app-tender-item',
  templateUrl: './tender-item.component.html',
  styleUrls: ['./tender-item.component.scss']
})
export class TenderItemComponent implements OnInit, OnChanges {

  @Input() tenderData: any;
  //
  lineitemdata
  displayedColumns: string[] = ['ItemNo', 'SpecNo', 'ItemName', 'Description',
    'Unit', 'Unit-Price', 'Quantity', 'TotalPrice'];
  //
  tender: Tender = new Tender();
  lineItems: any;
  lineItemsArr: any;
  masterForm: FormGroup;
  accordion: any = {};
  // lineItemsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    private tenderService: TenderService) { }

  ngOnInit() {
    // console.log('ngOnInit >> got items: ', this.tenderData.items);
    // console.log('ngOnInit >> got sections: ', this.tenderData.sec);
    this.getMasterForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('ngOnChanges >> got items: ', this.tenderData.items);
    // console.log('ngOnChanges >> got sections: ', this.tenderData.sec);
    console.log(this.tenderData.widget)
    //
  }

  getMasterForm() {
    // console.log()
    this.masterForm = this.formBuilder.group({
      items: this.formBuilder.array([])
      // this.formBuilder.array([this.generateLineItemsControls()])
    })
  }
  createLineItemForm() {
    this.tenderData.items.forEach((item, index) => {
      const lineItemFormArr = this.masterForm.get('items') as FormArray;
      lineItemFormArr.push(this.createItemCtrl(item));
      //
      item.subitems.forEach((subItem, subItemIndex) => {
        // console.log((<FormArray>lineItemFormArr.controls[index].get('subcontractors')));
        const subItemNode: FormArray = (<FormArray>lineItemFormArr.controls[index].get('subitems'))
        //
        subItemNode.push(this.createSublineItemsCtrls(subItem));
        //
      })

      // item.equipments.forEach((equipment, equipIndex) => {
      //     const equipmentNode: FormArray = (<FormArray>lineItemFormArr.controls[index].get('equipments'));
      //     equipmentNode.push(this.createEquipmentControls(equipment))
      // })
      //
      // item.labours.forEach((labour, labourIndex) => {
      //     const labourNode: FormArray = (<FormArray>lineItemFormArr.controls[index].get('labours'));
      //     labourNode.push(this.createLaboursControls(labour));
      // })
    })
    // console.log(this.masterForm)
    this.masterForm.get('items')['controls'].map((item) => {
      // console.log(item)
      // item.get('equipments')['controls'].map(eq => {
      //     // console.log(eq)
      // },
      //     item.get('subcontractors')['controls'].map(sub => {
      //         // console.log(sub)
      //         // console.log(item)
      //         sub.get('subitems')['controls'].map(subItem => {
      //             //
      //         })
      //     })
      // )
    }
    )
  }
  createItemCtrl(element) {
    return this.formBuilder.group({
      itemNo: [element.itemNo],
      specNo: [element.specNo],
      itemName: [element.itemName],
      description: [element.description],
      unit: [element.unit],
      unitPrice: [element.unitPrice],
      quantity: [element.quantity],
      totalPrice: [element.totalPrice],
      // trench: [element.trench],
      subitems: this.formBuilder.array([])
      // subcontractors: this.formBuilder.array([]),
      // equipments: this.formBuilder.array([]),
      // labours: this.formBuilder.array([])
    })
  }

  createSublineItemsCtrls(element?) {
    return this.formBuilder.group({
      id: [element.id],
      name: [element.name],
      unit: [element.unit],
      unitPrice: [element.unitPrice],
      quantity: [element.quantity],
      totalPrice: [element.totalPrice]
    })
  }

  addLineItem() {
    const subIlineItm = {
      // id: '',
      name: '',
      unit: '',
      unitPrice: '',
      quantity: '',
      totalPrice: ''
    }
    //
    const lineItm = this.formBuilder.group({
      itemNo: [''],
      specNo: [''],
      itemName: [''],
      description: [''],
      unit: [''],
      unitPrice: [''],
      quantity: [''],
      totalPrice: [''],
      subitems: this.formBuilder.array([this.createSublineItemsCtrls(subIlineItm)])
    });
    //
    const lineItemsArr = this.masterForm.get('items') as FormArray;
    
    // lineItemsArr.insert(0, lineItm);
    lineItemsArr.push(lineItm);
    console.log(lineItemsArr);
    //
    // console.log(this.tenderData.items);
    /* if (!this.tenderData.items) {
      console.log(this.tenderData);
      this.tenderData.items = [];
      this.tenderData.items.push(lineItm);
    } */


  }
  //
  toggleCollapse(index) {
    console.log(index);
    this.accordion[index] = !this.accordion[index]
    console.log(this.accordion);
  }
  add() {
    /* if (!this.masterForm) {
      this.getMasterForm();
    } */

    this.addLineItem();
    console.log(this.masterForm)
  }
  //
  save() {
    if (this.tender._id) {
      this.tenderService.update(this.tender).subscribe(() => {
        this.tenderService.getTenderById(this.tender._id).subscribe((tender) => {
          // this.tender = tender;
        })
      })
    } else {
      this.tenderService.add(this.tender).subscribe(() => {
        this.tenderService.getTenderById(this.tender._id).subscribe((tender) => {
          // this.tender = tender;
        })
      })
    }

  }
  //
  delete(item) {
    this.tender.items = this.tender.items.filter((v) => {
      if (v.id === item.id) {
        return false;
      } else {
        return true;
      }
    })
  }

} // end of class
