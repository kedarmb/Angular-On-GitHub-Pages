import { Component, Input, OnInit, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '../../core/service/helper.service';
import { regex, errorMsg } from '../../core/constant/index';
import { HttpService } from 'app/shared/core/service/http.service';
import { MatDialogClose, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EquipmentsModalComponent } from '../equipments-modal/equipments-modal.component';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  formSubmitted = false;
  userForm: FormGroup;
  placement = 'bottom';
  passwordShown = false;
  constructor(@Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
    private formBuider: FormBuilder,
    private helperService: HelperService,
    private httpService: HttpService,
    private dialogRef: MatDialogRef<EquipmentsModalComponent>
  ) { }

  ngOnInit() {
    this.createUserForm()
  }

  createUserForm() {
    this.userForm = this.formBuider.group({
      email: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.emailReg, msg: errorMsg.email })]],
      fname: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.alphabetOnly, msg: errorMsg.nameMessage })]],
      lname: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.alphabetOnly, msg: errorMsg.nameMessage })]],
      password: ['', [Validators.required,
        this.helperService.customPatternValid({ pattern: regex.passwordPattern, msg: errorMsg.passwordMessage })]],
      mobile: ['', [Validators.required, this.helperService.customPatternValid({pattern: regex.phoneNumber, msg: errorMsg.phoneMsg})]],
      role: ['prime'],
      status: ['created'],
      organization: ['5dd512e3b0975e2e70e12d01',
      [Validators.required, this.helperService.customPatternValid({ msg: errorMsg.requiredField })]]
    });
  }

  // close() {
  //   this.modal._matDialogClose();
  // }
  close() {
    this.dialogRef.close();
    // this.modal._matDialogClose('close');
  }
  save() {
    this.formSubmitted = true;
    if (this.userForm.valid)  {
      if (this.userForm) {
        this.httpService.createUser(this.userForm.value).subscribe((successData) => {
          console.log('successData:', successData);
          this.modal._matDialogClose()
        }, (err) => {
          console.log(err);
          this.modal._matDialogClose();
        })
      }
    }
  }
  passwordToggle() {
    if (this.passwordShown) {
      this.passwordShown = true;
    }
  }
}
