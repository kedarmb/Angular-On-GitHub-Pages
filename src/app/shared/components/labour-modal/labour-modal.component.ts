// import { HttpService } from './../../core/service/http.service';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'app/shared/core/service/helper.service';
import { regex, errorMsg } from 'app/shared/core/constant';
import Labour from 'app/shared/core/model/labour.model';
import { HttpService } from 'app/shared/core/service/http.service';
import { MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-labour-modal',
  templateUrl: './labour-modal.component.html',
  styleUrls: ['./labour-modal.component.scss']
})
export class LabourModalComponent implements OnInit {
  labourForm: FormGroup;
  @Output() public labourData = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
    private fb: FormBuilder,
    private helperService: HelperService,
    private httpService: HttpService,
    private dialogRef: MatDialogRef<LabourModalComponent>
  ) { }

  ngOnInit() {
    this.labourForm = this.fb.group({
      name: ['', [ Validators.required, this.helperService.customPatternValid({
          pattern: regex.nameReg, msg: String(errorMsg.nameMessage)})]],
      rate: ['', [ Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
    })
  }

  save() {
    console.log(this.labourForm.value);
    this.httpService.createLabour(this.labourForm.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 200) {
          this.modal._matDialogClose()
          this.labourData.emit(response.body)
        }
      },
      (err) => {
        console.log(err);
        this.modal._matDialogClose();
      })
  };

  close() {
    this.dialogRef.close();
    // this.modal._matDialogClose('close');
  }
}
