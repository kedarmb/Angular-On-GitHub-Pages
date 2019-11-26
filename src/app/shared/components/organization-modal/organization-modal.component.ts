import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OrganizationModalFormGroup } from './organization-modal.validator';
import { OrganizationModalFormControl } from './organization-modal.validator';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { CountriesService } from 'app/shared/core/service/countries.service';
import Organization from 'app/shared/core/model/organization.model';
import { OrganizationService } from 'app/shared/core/service/organization.service';
@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {
  organizationModalFormGroup: OrganizationModalFormGroup = new OrganizationModalFormGroup();
  formSubmitted: boolean = false;

  @Input('organization')
  organization: Organization;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal, private organizationService: OrganizationService, private country: CountriesService) { }

  countryInfo: any[] = [];
  stateInfo: any[] = [];
  cityInfo: any[] = [];
  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.country.allCountries().
      subscribe(
        data2 => {
          this.countryInfo = data2.Countries;
          //console.log('Data:', this.countryInfo);
        },
        err => console.log(err),
        // () => console.log('complete')
      )
  }

  onChangeCountry(countryValue) {
    this.stateInfo = this.countryInfo[countryValue].States;
    this.cityInfo = this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }
  onChangeState(stateValue) {
    this.cityInfo = this.stateInfo[stateValue].Cities;
    //console.log(this.cityInfo);
  }

  close() {
    this.activeModal.close('closed');
  }
  save(organization) {
    if (organization.id) {
      this.organizationService.update(102, organization).subscribe(() => {
        this.activeModal.close('closed');
      })
    } else {
      this.organizationService.create(organization).subscribe(() => {
        this.activeModal.close('closed');
      })
    }



  }
}
