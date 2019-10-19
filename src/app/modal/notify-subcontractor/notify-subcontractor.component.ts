import { Component, OnInit } from '@angular/core';
import {OrganizationComponent} from '../../organization/organization.component';
import {OrganizationService} from '../../service/organization.service';
import Organization from '../../model/organization.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notify-subcontractor',
  templateUrl: './notify-subcontractor.component.html',
  styleUrls: ['./notify-subcontractor.component.scss']
})
export class NotifySubcontractorComponent implements OnInit {

  organizations: Organization[];
  constructor(private activeModal: NgbActiveModal, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getAll().subscribe((organizations) => {
      this.organizations = organizations;
    })
  }
   close() {
    this.activeModal.close('close');
   }
}
