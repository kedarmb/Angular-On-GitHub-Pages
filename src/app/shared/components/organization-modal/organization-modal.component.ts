
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
    status: true,
    data: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
    private httpService: HttpService,
    private country: CountriesService,
    private fb: FormBuilder,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit() {
    this.organizationForm = this.fb.group({
      name: ['', [Validators.required,
      this.helperService.customPatternValid({ pattern: regex.nameReg, msg: errorMsg.nameMessage })]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      serviceType: ['', [Validators.required]],
      serviceArea: ['', [Validators.required]],
      orgType: [['1']],
      createDate: [new Date().toISOString],
      updateDate: [new Date().toISOString],
      _id: [this.data.modal._id]
    });

    if (this.data.modal.val === true) {
      const newVal = this.data.modal.data
      delete newVal.__v
      this.organizationForm.setValue(newVal)
    }
  }
  close() {
    this.resData.status = false;
    this.dialogRef.close(this.resData);
  }
  save() {
      const finalVal = this.organizationForm.value
      delete finalVal._id;
      this.httpService.createOrganization(finalVal)
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
      const finalVal = this.organizationForm.value
      delete finalVal.createDate
      this.httpService.updateOrganization(finalVal).subscribe(
        (response: any) => {
          if (response.status === 200) {
            this.dialogRef.close(this.resData);
          }
        },
        error => {
          console.log(error);
        }
      )
  }
}
