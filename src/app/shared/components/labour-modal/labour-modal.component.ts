// import { HttpService } from './../../core/service/http.service';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'app/shared/core/service/helper.service';
import { regex, errorMsg } from 'app/shared/core/constant';
import Labour from 'app/shared/core/model/labour.model';
import { HttpService } from 'app/shared/core/service/http.service';
import { MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-labour-modal',
  templateUrl: './labour-modal.component.html',
  styleUrls: ['./labour-modal.component.scss']
})
export class LabourModalComponent implements OnInit {
  labourForm: FormGroup;
  @Output() public labourData = new EventEmitter();
  resData = {
    status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
    data: ''
  };


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
    private httpService: HttpService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit() {
    this.createLabourForm();
    if (this.data.val === true) {
      const newVal = Object.assign({}, this.data.data)
      delete newVal.__v;
      delete newVal.createDate;
      delete newVal.updateDate;
      this.labourForm.patchValue(newVal);
    }
  }

  createLabourForm() {
    this.labourForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required,
      this.helperService.customPatternValid({ pattern: regex.nameReg, msg: String(errorMsg.requiredField) })]],
      description: ['', [Validators.required]],
    });
  }

  save() {
    const finalVal = this.labourForm.value
    delete finalVal._id;
    this.httpService.createLabour(finalVal)
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
    const finaVal = Object.assign({}, this.labourForm.value)
    this.httpService.updateLabour(finaVal, this.data.data._id)
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

  close() {
    this.resData.status = 'close';
    this.dialogRef.close(this.resData);
  }
}
