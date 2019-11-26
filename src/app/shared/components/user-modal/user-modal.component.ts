import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalFormGroup } from './user-modal-validator';
//import { Tender } from '../../model/tender.model';
//
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { errorMsg, regex } from '../../core/constant/index';
import { HelperService } from '../../core/service/helper.service';
// import { User } from '../../user.model';
//
//  import {UserModalFormControl} from './user-modal-validator';
// import {UserModalFormGroup} from './user-modal-validator';



@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  formSubmitted = false;
  userForm: FormGroup;

  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal,
    private formBuider: FormBuilder,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.userForm = this.formBuider.group({
      
    });
  }

  close() {
    this.activeModal.close('closed');
  }
  save(userForm) {
    this.formSubmitted = true;
    console.log('alish');
  }
}
