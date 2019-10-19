
import { Component, OnInit } from '@angular/core';

import {TenderModalComponent} from '../modal/tender-modal/tender-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TenderService} from '../service/tender.service';
import {Tender} from '../model/tender.model';
import {ActivatedRoute, Router} from '@angular/router';
import { OrganizationModalComponent } from 'app/modal/organization-modal/organization-modal.component';
import Organization from '../model/organization.model';
import {OrganizationService} from '../service/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  organizations: any;
  ngOnInit() {
 this.organizationService.getOrganizations().subscribe((data) => {
   this.organizations = data;
 })
  }

  onDelete(index) {

  }
  constructor(private modalService: NgbModal, private organizationService: OrganizationService, private router: Router) {}

  open(item?) {
    const modalRef = this.modalService.open(OrganizationModalComponent, {centered: true});
    modalRef.componentInstance.organization = item || new Organization();

  }
  viewTender() {
    this.router.navigateByUrl('view-tender');
  }

}
