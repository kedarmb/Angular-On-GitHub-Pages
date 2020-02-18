import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { HttpService } from 'app/shared/core/service/http.service';
import { MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HelperService } from 'app/shared/core/service/helper.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-line-item-crew',
  templateUrl: './line-item-crew.component.html',
  styleUrls: ['./line-item-crew.component.scss']
})
export class LineItemCrewComponent implements OnInit {

  crewList: any[];
  selectionForm: FormGroup;
  selectionStr = 'choose one from the list';
  crewForm: any;
  //
  _labourTotalCost = 0;
  _equipmentTotalCost = 0;
  _crewTotalCost = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private hs: HelperService,
    private toastr: ToastrService, private spinner: NgxSpinnerService
  ) {
    //
  }

  ngOnInit() {
    this.crewList = this.hs.getCrewList();
    console.log('crew list is ...', this.crewList);
    this.createSelectionForm();
  }
  createSelectionForm() {
    this.selectionForm = new FormGroup({
      selectedCrew: new FormControl()
    })
  }


  onCrewSelect(evt) {
    // console.log(evt);
    this.selectionStr = 'you have chosen';
    const _crewObj = evt.value;
    // console.log(_crewObj);
    //
    // const crewCtrl = lineItemRef.get('crewChosen');
    this.crewForm = this.initCrewReferenceCtrl(_crewObj);
    // crewCtrl.setValue(this.initCrewReferenceCtrl(_crewObj));    
  }
  initCrewReferenceCtrl(crew) {
    return this.formBuilder.group({
      // for saving add tender, section,  lineitem ref
      _id: [crew._id],
      name: [crew.name],
      description: [crew.description],
      labours: this.createCrewLaboursArr(crew.labours),
      equipments: this.createCrewEquipmentsArr(crew.equipments)
    })
  }
  createCrewLaboursArr(laboursArr) {
    const crew_labours_arr = new FormArray([]);
    //
    laboursArr.forEach(item => {
      crew_labours_arr.push(this.formBuilder.group({
        _id: [item._id],
        name: [item.name],
        hourlyCost: [item.hourlyCost],
        requiredHrs: [],
        totalCost: []
      }))
    });
    return crew_labours_arr;
  }
  createCrewEquipmentsArr(equipmentsArr) {
    const crew_equip_arr = new FormArray([]);
    //
    equipmentsArr.forEach(item => {
      crew_equip_arr.push(this.formBuilder.group({
        _id: [item._id],
        name: [item.name],
        hourlyCost: [item.hourlyCost],
        requiredHrs: [],
        totalCost: []
      }))
    })
    return crew_equip_arr;
  }

  // Crew Cost Calculation
  calculateCrewTotal(itemRef) {
    
    let _totalLaborCost = 0;
    let _totalEquipmentCost = 0;
    // calculate individual Item's total
    const _itemTotal = itemRef.value.requiredHrs * itemRef.value.hourlyCost;
    itemRef.get('totalCost').setValue(_itemTotal);
    // let _totalCrewCost = 0;
    console.log(this.crewForm.value);
    const formVal = this.crewForm.value;
    for (let i = 0; i < formVal['labours'].length; i++) {
      const _itemCost = formVal['labours'][i].hrs * formVal['labours'][i].hourlyCost;
      this._labourTotalCost += _itemCost;
    }
    //
    /*for (let i = 0; i < this.crewObj['equipments'].length; i++) {
      const hourlyCost = this.crewObj['equipments'][i].hrs * this.crewObj['equipments'][i].hourlyCost;
      _totalEquipmentCost += hourlyCost;
    }
    this.totalCrewCost = _totalEquipmentCost + _totalLaborCost; */
    //
    // console.log('totalLaborCost ', _totalLaborCost);
    // console.log('totalEquipmentCost ', _totalEquipmentCost);
    //
    // cost roll up with crew
    /* const lineTotalSum = this.totalCrewCost + this.totalSublineCost
    lineItemRef.get('lineTotalPrice').patchValue(lineTotalSum);
    const unit = lineItemRef.value.lineTotalPrice / lineItemRef.value.quantity;
    lineItemRef.get('unitPrice').patchValue(unit); */
  }

}
