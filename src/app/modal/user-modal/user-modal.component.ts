import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tender } from '../../model/tender.model';
import { User } from '../../user.model';
//
import {UserModalFormControl} from './user-modal-validator';
import {UserModalFormGroup} from './user-modal-validator';



@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {


  placement = 'bottom';
  userForm: UserModalFormGroup = new UserModalFormGroup();
  formSubmitted: boolean = false;
  //
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  save(userForm){
    this.formSubmitted = true;
  }

  close() {
    this.activeModal.close('closed');
  }
}
