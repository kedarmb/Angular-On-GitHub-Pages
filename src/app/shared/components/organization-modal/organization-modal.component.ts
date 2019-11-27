
import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Organization from 'app/shared/core/model/organization.model';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from 'app/shared/core/service/http.service';

import { CountriesService } from 'app/shared/core/service/countries.service';

import { HelperService } from 'app/shared/core/service/helper.service';

import { regex, errorMsg } from 'app/shared/core/constant';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {
  organizationForm: FormGroup;
  formSubmitted = false;

  // @Input('organization')
  organization: Organization;
  placement = 'bottom';
  countryInfo: any[] = [];
  stateInfo: any[] = [];
  cityInfo: any[] = [];
  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService,
    private country: CountriesService,
    private fb: FormBuilder,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.organizationForm = this.fb.group({
      name: ['',
        [Validators.required, this.helperService.customPatternValid({
          pattern: regex.organizationName, msg: String(errorMsg.orgName + ' ' + errorMsg.nameMessage)
        })]],
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
    this.activeModal.close('closed');
  }
  save() {
    console.log(this.organizationForm.value);
      this.httpService.createOrganization(this.organizationForm.value).subscribe(
        (response: any) => {
          console.log(response);
          if (response.status === 200) {
            this.activeModal.close('closed');
          }
        },
        error => {
          console.log(error);
        }
      );
      // this.httpService.create(organization).subscribe(() => {
      //   this.activeModal.close('closed');
      // })
  }
}
