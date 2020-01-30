import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Equipments from 'app/shared/core/model/equipments.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'app/shared/core/service/helper.service';
import { regex, errorMsg } from 'app/shared/core/constant';
import { HttpService } from 'app/shared/core/service/http.service';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
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
    status: 'close',
    data: ''
  };
  @Output() public equipmentData = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<EquipmentsModalComponent>,
    private httpService: HttpService) { }

  ngOnInit() {
    this.createEquipmentForm();
    if (this.data.val === true) {
      const newVal = Object.assign({}, this.data.data)
      delete newVal.createDate
      delete newVal.updateDate
      delete newVal.createdBy
      delete newVal.__v
      delete newVal.organizationRef
      this.equipmentsForm.setValue(newVal)
    }
  }

    createEquipmentForm() {
    this.equipmentsForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required,
        this.helperService.customPatternValid({ pattern: regex.nameReg, msg: String(errorMsg.requiredField) })]],
      description: ['', [Validators.required]],
    });
  }

  close() {
    this.resData.status = 'close';
    this.dialogRef.close(this.resData);
  }

  save() {
    const finalVal = this.equipmentsForm.value
    delete finalVal._id;
    this.httpService.createEquipment(finalVal)
      .subscribe((response: any) => {
        if (response.status === 201) {
          this.resData.status = 'add';
          this.resData.data = response.body;
          this.dialogRef.close(this.resData);
          this.toastr.success(response.statusText)
        }
      }, error => {
        this.toastr.error(error.error.message)
      }
      )
  };

  update() {
    const finaVal = Object.assign({}, this.equipmentsForm.value)
    this.httpService.updateEquipment(finaVal, this.data.data._id)
      .subscribe((response: any) => {
        if (response.status === 201) {
          this.resData.status = 'update';
          this.dialogRef.close(this.resData);
          this.toastr.success(response.statusText)
        }
      },
        error => {
          this.toastr.error(error.error.message)
        }
      )
  }
}
