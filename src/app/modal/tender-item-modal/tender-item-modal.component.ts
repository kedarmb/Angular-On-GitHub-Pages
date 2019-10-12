import {Component, Input, OnInit} from '@angular/core';
import {Tender} from '../../model/tender.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TenderItem} from '../../model/tender-item.model';

@Component({
  selector: 'app-tender-item-modal',
  templateUrl: './tender-item-modal.component.html',
  styleUrls: ['./tender-item-modal.component.scss']
})
export class TenderItemModalComponent implements OnInit {

  @Input('tenderItem')
  tenderItem: TenderItem ;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {

  }

  close() {
  this.activeModal.close('closed');
}

}
