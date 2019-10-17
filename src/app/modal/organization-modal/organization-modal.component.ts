import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Tender} from '../../model/tender.model';
import Organization from '../../model/organization.model';
@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {

  @Input('tender')
  tender: Organization ;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {

  }


  close() {
    this.activeModal.close('closed');
  }
}
