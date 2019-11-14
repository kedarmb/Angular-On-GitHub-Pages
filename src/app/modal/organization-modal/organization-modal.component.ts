import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Tender} from '../../model/tender.model';
import Organization from '../../model/organization.model';
import {OrganizationService} from '../../service/organization.service';

import { OrganizationModalFormGroup } from './organization-modal.validator';
import {OrganizationModalFormControl} from './organization-modal.validator';
import {OrganizationModal} from '../../model/organization-modal.model';
import {Router} from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {
  organizationModalFormGroup:OrganizationModalFormGroup=new OrganizationModalFormGroup();
  formSubmitted: boolean = false;

  @Input('organization')
  organization: Organization ;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal, private organizationService: OrganizationService) {}


  ngOnInit() {

  }
  countries:OrganizationModal[]=[
  { id:"1",name:"USA"},
    {id:"2",name:"UK"},
    {id:"3", name:"CANADA"},
    {id:"4", name:"France"}
]

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
