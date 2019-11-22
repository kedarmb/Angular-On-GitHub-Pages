import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Tender} from '../../model/tender.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  
  formSubmitted: boolean = false;

  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {

  }


  close() {
    this.activeModal.close('closed');
  }
  save(userForm) {
    this.formSubmitted = true;
    console.log("alish");
  }
}
 
    