import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tender-modal',
  templateUrl: './tender-modal.component.html',
  styleUrls: ['./tender-modal.component.scss']
})
export class TenderModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }
}
