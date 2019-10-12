import {Component, Input, OnInit} from '@angular/core';
import {Tender} from '../../model/tender.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TenderSubitem} from '../../model/tender-subitem.model';

@Component({
  selector: 'app-tender-subitem-modal',
  templateUrl: './tender-subitem-modal.component.html',
  styleUrls: ['./tender-subitem-modal.component.scss']
})
export class TenderSubitemModalComponent implements OnInit {

  @Input('tenderSubItem')
  tenderSubitem: TenderSubitem ;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {

  }

  close() {
    this.activeModal.close('closed');
  }

}
