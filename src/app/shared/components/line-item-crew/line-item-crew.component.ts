import { Component, OnInit, Output, EventEmitter, Inject, Optional, ViewChild, Input } from '@angular/core';
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
  selectedCrew: any;
  //
  _labourTotalCost = 0;
  _equipmentTotalCost = 0;
  _crewTotalCost = 0;
  //
  resData = {
    status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
    data: null,
    totalCost: 0

  };
  isValid = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public payLoad: any,
    @Optional() private dialogRef: MatDialogRef<any>,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private hs: HelperService,
    private toastr: ToastrService, private spinner: NgxSpinnerService
  ) {
    //
  }

  ngOnInit() {
    this.crewList = this.hs.getCrewList();
    console.log('payLoad is ', this.payLoad);
    this.createSelectionForm();
  }
  createSelectionForm() {
    this.selectionForm = new FormGroup({
      selectedCrew: new FormControl()
    })
  }


  onCrewSelect(evt) {
    this.selectionStr = 'you have chosen';
    this.selectedCrew = evt.value;
    this.crewForm = this.initCrewReferenceCtrl(this.selectedCrew);
    //
    this.runTotalCalculation();
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
  calculateOnInput(itemRef) {
    // calculate individual Item's total
    const _itemTotal = itemRef.value.requiredHrs * itemRef.value.hourlyCost;
    itemRef.get('totalCost').setValue(_itemTotal);
    //
    this.runTotalCalculation();
  }

  runTotalCalculation() {
    this.isValid = false;
    this._labourTotalCost = this._equipmentTotalCost = this._crewTotalCost = 0;
    const formVal = this.crewForm.value;
    for (let i = 0; i < formVal['labours'].length; i++) {
      this._labourTotalCost += formVal['labours'][i].totalCost;
    }
    for (let i = 0; i < formVal['equipments'].length; i++) {
      this._equipmentTotalCost += formVal['equipments'][i].totalCost;
    }
    //
    this._crewTotalCost = this._labourTotalCost + this._equipmentTotalCost;
    if (this._crewTotalCost > 0) {
      this.isValid = true;
    }
    //
    // console.log('labor ' + this._labourTotalCost + ' | ' + ' Equip ' + this._equipmentTotalCost + ' | ' + this._crewTotalCost)
  }

  saveCrew() {
    this.payLoad.crewTotalCost = this._crewTotalCost;
    this.payLoad.labourTotalCost = this._labourTotalCost;
    this.payLoad.equipmentTotalCost = this._equipmentTotalCost;
    this.payLoad.crewLabourEquipment = this.selectedCrew._id;
    this.payLoad.organizationId = this.hs.getOrgId();
    // replace with laborid & equipmentid
    const _labors = [...this.crewForm.value['labours']];
    for (let i = 0; i < _labors.length; i++) {
      _labors[i].labourId = _labors[i]._id;
      delete _labors[i]._id;
    }
    this.payLoad.labourArr = _labors;
    //
    const _equips = [...this.crewForm.value['equipments']];
    for (let i = 0; i < _equips.length; i++) {
      _equips[i].equipmentId = _equips[i]._id;
      delete _equips[i]._id;
    }
    this.payLoad.equipmentArr = _equips;
    // console.log('final payload is ', this.payLoad);
    const lineID = this.payLoad.lineItem;
    const tenderID = this.payLoad.tender;
    const sectionID = this.payLoad.section;
    const crewID = this.payLoad.crewLabourEquipment;
    const appendString = lineID + '/tender/' + tenderID + '/section/' + sectionID + '/crew/' + crewID;
    // console.log('append string is .. ', appendString);
    // line-item /: id / tender /: tenderId / section /: sectionId / crew /: crewId
    this.httpService.saveCrewForLineItem(appendString, this.payLoad).subscribe(response => {
      console.log(response);
      if (response.status === 200) {
        this.resData.status = 'add';
        this.resData.data = response.body;
        this.resData.totalCost = this._crewTotalCost;
        this.dialogRef.close(this.resData);
        this.toastr.success('Crew for Line Item saved');
      }
    }, (err) => {
      this.toastr.error('Error saving crew for line item. Please try later.');
      console.log('erre saving crew for Line Item ', err);
    })


  }
  cancelCrew() {
    this.resData.status = 'close';
    this.dialogRef.close(this.resData);
  }

}
