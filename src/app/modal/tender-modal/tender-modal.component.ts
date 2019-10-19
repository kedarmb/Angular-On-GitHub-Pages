import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Tender} from '../../model/tender.model';
import {OrganizationService} from '../../service/organization.service';

@Component({
  selector: 'app-tender-modal',
  templateUrl: './tender-modal.component.html',
  styleUrls: ['./tender-modal.component.scss']
})
export class TenderModalComponent implements OnInit {

  @Input('tender')
  tender: Tender ;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal, organizationService: OrganizationService) {}

  ngOnInit() {

  }


  close() {
    this.activeModal.close('closed');
  }

}
