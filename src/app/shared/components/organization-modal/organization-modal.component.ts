import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Organization from 'app/shared/core/model/organization.model';
import { HttpService } from 'app/shared/core/service/http.service';
import { CountriesService } from 'app/shared/core/service/countries.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { regex, errorMsg } from 'app/shared/core/constant';
import { MatDialog, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { updateLocale } from 'moment';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {
  organizationForm: FormGroup;
  formSubmitted = false;
  @Output() valueChange = new EventEmitter();
  organization: Organization;
  placement = 'bottom';
  countryInfo: any[] = [];
  stateInfo: any[] = [];
  cityInfo: any[] = [];
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
    private dialogRef: MatDialogRef<any>,
    private spinner: NgxSpinnerService
  ) { 
    this.spinner.hide();
  }

  ngOnInit() {
    this.createOrganizationForm();
    if (this.data.val === true) {
      const newVal = Object.assign({}, this.data.data);
      delete newVal.__V;
      delete newVal.__v;
      delete newVal.createDate;
      delete newVal.updateDate;
      delete newVal.createdBy;
      delete newVal.organizationRef;
      this.organizationForm.setValue(newVal);
    }
  }
  createOrganizationForm() {
    this.organizationForm = this.fb.group({
      name: ['', [Validators.required,
      this.helperService.customPatternValid({ pattern: regex.nameReg, msg: errorMsg.nameErr })]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      contactEmail: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.emailReg, msg: errorMsg.email }),
      this.helperService.customPatternValid({ msg: errorMsg.requiredField })]],
      contactPhone: ['', [Validators.required,
      this.helperService.customPatternValid({ pattern: regex.phoneNumber, msg: errorMsg.phoneMsg })]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      serviceType: ['', [Validators.required]],
      serviceArea: ['', [Validators.required]],
      orgType: ['Prime'],
      // organizationRef: ['5dd5158b75de6156ccceb0ee'],
      _id: [this.data._id]
    });
  }
  close() {
    this.resData.status = 'close';
    this.dialogRef.close(this.resData);
  }
  save() {
    const finalVal = this.organizationForm.value
    delete finalVal._id;
    this.httpService.createOrganization(finalVal)
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
    const finaVal = Object.assign({}, this.organizationForm.value)
    this.httpService.updateOrganization(finaVal, this.data.data._id)
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
