import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Tender} from '../../model/tender.model';

@Component({
  selector: 'app-tender-modal',
  templateUrl: './tender-modal.component.html',
  styleUrls: ['./tender-modal.component.scss']
})
export class TenderModalComponent implements OnInit {

  @Input('tender')
  tender: Tender ;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.tender) {
      this.tender.quoteStartDate = {year: this.tender.quoteStartDate.getUTCFullYear(),
        month: this.tender.quoteStartDate.getUTCMonth() + 1,
        day: this.tender.quoteStartDate.getUTCDate()};
      this.tender.quoteEndDate = {year: this.tender.quoteEndDate.getUTCFullYear(),
        month: this.tender.quoteEndDate.getUTCMonth() + 1,
        day: this.tender.quoteEndDate.getUTCDate()};
      this.tender.openDate = {year: this.tender.openDate.getUTCFullYear(),
        month: this.tender.openDate.getUTCMonth() + 1,
        day: this.tender.openDate.getUTCDate()};
      this.tender.closeDate = {year: this.tender.closeDate.getUTCFullYear(),
        month: this.tender.closeDate.getUTCMonth() + 1,
        day: this.tender.closeDate.getUTCDate()};
    }


  }
  close() {
    this.activeModal.close('closed');
  }
}
