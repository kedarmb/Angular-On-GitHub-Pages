import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '../../core/service/helper.service';
import { regex, errorMsg } from '../../core/constant/index';
import User from 'app/shared/core/model/user.model';
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
  @Output() valueChange = new EventEmitter();
  user: User;
  placement = 'bottom';
  passwordShown = false;
  resData = {
    status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
    data: ''
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
    private formBuider: FormBuilder,
    private helperService: HelperService,
    private httpService: HttpService,
    private dialogRef: MatDialogRef<any>,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createUserForm();
    if (this.data.val === true) {
      const newVal = Object.assign({}, this.data.data)
      delete newVal.__V
      delete newVal.createDate
      delete newVal.updateDate
      this.userForm.setValue(newVal)
    }
  }

  createUserForm() {
    this.userForm = this.formBuider.group({
      _id: [''],
      email: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.emailReg, msg: errorMsg.email })]],
      fname: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.alphabetOnly, msg: errorMsg.nameMessage })]],
      lname: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.alphabetOnly, msg: errorMsg.nameMessage })]],
      password: ['', [Validators.required,
      this.helperService.customPatternValid({ pattern: regex.passwordPattern, msg: errorMsg.passwordMessage })]],
      mobile: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.phoneNumber, msg: errorMsg.phoneMsg })]],
      role: ['admin'],
      status: ['active'],
      organization: ['5dd512e3b0975e2e70e12d01',
        [Validators.required, this.helperService.customPatternValid({ msg: errorMsg.requiredField })]]
    });
  }

  close() {
    this.resData.status = 'close';
    this.dialogRef.close(this.resData);
  }

  save() {
    const finalVal = this.userForm.value
    delete finalVal._id;
    delete finalVal.updateDate;
    this.httpService.createUser(finalVal)
      .subscribe((response: any) => {
        if (response.status === 201) {
          this.resData.status = 'add';
          this.resData.data = response.body.user;
          this.dialogRef.close(this.resData);
          this.toastr.success(response.statusText)
        }
      }, error => {
        this.toastr.error(error.error.message)
      }
      )
  };
  update() {
    const finaVal = Object.assign({}, this.userForm.value)
    delete finaVal.createDate
    this.httpService.updateUser(finaVal, this.data.data._id)
      .subscribe((response: any) => {
        if (response.status === 201) {
          this.resData.status = 'update';
          this.toastr.success(response.statusText)
          this.dialogRef.close(this.resData);
        }
      },
        error => {
          this.toastr.error(error.error.message)
        }
      )
  }

  passwordToggle() {
    if (this.passwordShown) {
      this.passwordShown = true;
    }
  }
}
