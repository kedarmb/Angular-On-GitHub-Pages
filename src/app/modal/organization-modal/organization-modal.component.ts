import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Tender} from '../../model/tender.model';
import Organization from '../../model/organization.model';
import {OrganizationService} from '../../service/organization.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {

  @Input('organization')
  organization: Organization ;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal, private organizationService: OrganizationService) {}

  ngOnInit() {

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
