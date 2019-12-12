
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Organization from 'app/shared/core/model/organization.model';

// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from 'app/shared/core/service/http.service';

import { CountriesService } from 'app/shared/core/service/countries.service';

import { HelperService } from 'app/shared/core/service/helper.service';

import { regex, errorMsg } from 'app/shared/core/constant';
import { MatDialog, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EquipmentsModalComponent } from '../equipments-modal/equipments-modal.component';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {
  organizationForm: FormGroup;
  formSubmitted = false;
  @Output() valueChange = new EventEmitter();
  // @Input('organization')
  organization: Organization;
  placement = 'bottom';
  countryInfo: any[] = [];
  stateInfo: any[] = [];
  cityInfo: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
    // public modal: MatDialogClose,
    // public activeModal: NgbActiveModal,
    private httpService: HttpService,
    private country: CountriesService,
    private fb: FormBuilder,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<EquipmentsModalComponent>
  ) { }

  ngOnInit() {
    this.organizationForm = this.fb.group({
      name: ['',
        [Validators.required, this.helperService.customPatternValid({ pattern: regex.nameReg, msg: errorMsg.nameMessage })]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      serviceType: ['', [Validators.required]],
      serviceArea: ['', [Validators.required]],
      type: [['1']]
    });
  }
  public subForm() {
    console.log(' this.organizationForm:', this.organizationForm);
  }

  close() {
    this.dialogRef.close();
    // this.modal._matDialogClose('close');
  }
  save() {
    console.log(this.organizationForm.value);
      this.httpService.createOrganization(this.organizationForm.value).subscribe(
        (response: any) => {
          console.log(response);
          if (response.status === 200) {
            this.modal._matDialogClose('');
            this.valueChange.emit(response.status);
          }
        },
        error => {
          console.log(error);
          this.modal._matDialogClose('');
        }
      )};
}
