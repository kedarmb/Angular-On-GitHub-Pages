import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
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

  @Output() public equipmentData = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
              private fb: FormBuilder,
    private helperService: HelperService, private dialogRef: MatDialogRef<EquipmentsModalComponent>,
    private httpService: HttpService) {}

    ngOnInit() {
    this.equipmentsForm = this.fb.group({
      name:
      ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.nameReg, msg: String(errorMsg.requiredField)})]],
      rate: ['', [ Validators.required, this.helperService.customPatternValid({msg: String(errorMsg.requiredField)})]],
      description: ['', [Validators.required]],
      type: ['equipment', [Validators.required]]
    });
  }
  public subForm() {
    console.log('this.organizationForm:', this.equipmentsForm);
  }
  close() {
    this.dialogRef.close();
    // this.modal._matDialogClose('close');
  }
  save() {
    console.log(this.equipmentsForm.value);
    this.httpService.createEquipment(this.equipmentsForm.value).subscribe((response: any) => {
      console.log(response);
        if (response.status === 200) {
          this.modal._matDialogClose('closed');
          this.equipmentData.emit(response.body)
        }
      })
    }
}
