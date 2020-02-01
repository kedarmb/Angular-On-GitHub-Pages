import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Organization from 'app/shared/core/model/organization.model';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { regex, errorMsg } from 'app/shared/core/constant';
import { MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import csc from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city'
import {orgType } from '../../core/constant/index';
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
    data: '',
    id: ''
  };
  orgs = orgType;
  countries: ICountry[] = [];
  states: IState[] = [];
  cities: ICity[] = [];

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
    this.countries = csc.getAllCountries();
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
      delete newVal.createdDate;
      delete newVal.updatedDate;
      this.states.push(this.getStateById(newVal.province));
      this.cities.push(this.getCityById(newVal.city));
      this.organizationForm.setValue(newVal);
    }
    console.log(this.orgs)
  }
  getStateById(e) {
    return csc.getStateById(e)
  }
  getCityById(e) {
    return csc.getCityById(e)
  }
  getStates(e): any {
    this.states = csc.getStatesOfCountry(e);
  }
  getCity(e) {
    this.cities = csc.getCitiesOfState(e);
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
          this.resData.data = response.body;
          console.log(this.resData.data)
          this.resData.id = this.data.id
          console.log(this.resData.id)
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
