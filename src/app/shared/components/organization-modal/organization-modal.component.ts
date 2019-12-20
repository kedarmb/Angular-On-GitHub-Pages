
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
    private country: CountriesService,
    private fb: FormBuilder,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit() {
    this.createOrganizationForm();
    if (this.data.val === true) {
      const newVal = this.data.data
      delete newVal.__v
      this.organizationForm.setValue(newVal)
    }
  }
  createOrganizationForm() {
    this.organizationForm = this.fb.group({
      name: ['', [Validators.required,
                        this.helperService.customPatternValid({ pattern: regex.nameReg, msg: errorMsg.nameErr })]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      contactEmail: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.emailReg, msg: errorMsg.email }),
                                                this.helperService.customPatternValid({ msg: errorMsg.requiredField})]],
      contactPhone: ['', [Validators.required,
                            this.helperService.customPatternValid({ pattern: regex.phoneNumber, msg: errorMsg.phoneMsg })]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      serviceType: ['', [Validators.required]],
      serviceArea: ['', [Validators.required]],
      orgType: ['Prime'],
      createDate: [new Date().toISOString],
      updateDate: [new Date().toISOString],
      createdBy: ['5da878a9c635743159f4d8d9'],
      organizationRef: ['5dd5158b75de6156ccceb0ee'],
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
    delete finalVal.updateDate;
    console.log(this.data.data._id)
    this.httpService.createOrganization(finalVal)
      .subscribe((response: any) => {
        if (response.status === 201) {
          
          console.log(this.resData);
          this.resData.status = 'add';
          this.resData.data = response.body;

          this.dialogRef.close(this.resData);
        }
      }, error => {
          console.log(error);
        }
      )};

  update() {
    const finaVal = this.organizationForm.value
    delete finaVal.createDate
    delete finaVal._id
    console.log(this.data.data._id)
    console.log(this.organizationForm.value)
    this.httpService.updateOrganization(finaVal, this.data.data._id)
    .subscribe((response: any) => {
      console.log(response)
      if (response.status === 201) {
        console.log(response)
        this.resData.status = 'update';
          this.dialogRef.close(this.resData);
        }
      },
        error => {
          console.log(error);
        }
      )
  }
}
