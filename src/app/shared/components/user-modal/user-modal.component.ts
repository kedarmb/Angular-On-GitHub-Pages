import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '../../core/service/helper.service';
import { regex, errorMsg } from '../../core/constant/index';
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
    private helperService: HelperService,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuider.group({
      name: [
        '',
        [
          Validators.required,
          this.helperService.customPatternValid({
            pattern: regex.emailReg,
            msg: String(errorMsg.email)
          })
        ]
      ],
      email: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.emailReg, msg: errorMsg.email })]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  close() {
    this.activeModal.close('closed');
  }
  save() {
    this.formSubmitted = true;
    console.log('this.userForm.value', this.userForm.value);
  }
}
