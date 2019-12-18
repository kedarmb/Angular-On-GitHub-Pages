import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Equipments from 'app/shared/core/model/equipments.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'app/shared/core/service/helper.service';
import { regex, errorMsg } from 'app/shared/core/constant';
import { HttpService } from 'app/shared/core/service/http.service';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-equipments-modal',
  templateUrl: './equipments-modal.component.html',
  styleUrls: ['./equipments-modal.component.scss']
})
export class EquipmentsModalComponent implements OnInit {
  equipmentsForm: FormGroup;
  placement = 'bottom';

  @Output() valueChange = new EventEmitter();
  resData = {
    status: true,
    data: ''
  };
  @Output() public equipmentData = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<EquipmentsModalComponent>,
    private httpService: HttpService) { }

  ngOnInit() {
    this.equipmentsForm = this.fb.group({
      name:
        ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.nameReg, msg: String(errorMsg.requiredField) })]],
      rate: ['', [Validators.required, this.helperService.customPatternValid({ msg: String(errorMsg.requiredField) })]],
      description: ['', [Validators.required]],
      type: ['equipment', [Validators.required]]
    });
  }
  public subForm() {
    console.log('this.organizationForm:', this.equipmentsForm);
  }
  close() {
    this.resData.status = false;
    this.dialogRef.close(this.resData);
  }
  save() {
    const finalVal = this.equipmentsForm.value
    delete finalVal._id;
    this.httpService.createEquipment(finalVal)
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.dialogRef.close(this.resData);
          this.valueChange.emit(response);
        }
      },
        error => {
          console.log(error);
        }
      )
  };
  update() {
    const finalVal = this.equipmentsForm.value
    delete finalVal.createDate
    this.httpService.updateEquipment(finalVal)
      .subscribe((response: any) => {
        if (response.status === 201) {
          this.dialogRef.close(this.resData);
        }
      },
        error => {
          console.log(error);
        }
      )
  }
}
