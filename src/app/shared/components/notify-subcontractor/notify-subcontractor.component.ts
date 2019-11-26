
import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { OrganizationService } from 'app/service/organization.service';
import Organization from 'app/model/organization.model';

@Component({
  selector: 'app-notify-subcontractor',
  templateUrl: './notify-subcontractor.component.html',
  styleUrls: ['./notify-subcontractor.component.scss']
})
export class NotifySubcontractorComponent implements OnInit {

  organizations: Organization[];
  constructor(private activeModal: NgbActiveModal, private organizationService: OrganizationService) { }

  ngOnInit() {
   /* this.organizationService.getAll().subscribe((organizations) => {
      this.organizations = organizations;
    })*/
  }
   close() {
    this.activeModal.close('close');
   }
}
