import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '../../core/service/helper.service';
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
      name: [],
      email: [],
      password: [],
      phone: []
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
