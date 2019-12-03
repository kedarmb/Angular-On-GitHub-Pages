// import { HttpService } from './../../core/service/http.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'app/shared/core/service/helper.service';
import { regex, errorMsg } from 'app/shared/core/constant';
import Labour from 'app/shared/core/model/labour.model';
import { HttpService } from 'app/shared/core/service/http.service';


@Component({
  selector: 'app-labour-modal',
  templateUrl: './labour-modal.component.html',
  styleUrls: ['./labour-modal.component.scss']
})
export class LabourModalComponent implements OnInit {
  labourForm: FormGroup;
  @Output() public labourData = new EventEmitter();

  Output
  labours: Labour
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private helperService: HelperService,
    private httpService:HttpService
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
          this.activeModal.close('closed');
          this.labourData.emit(response.body)
        }
      },
      error => {
        console.log(error);
      }
    )
  };

  close() {
    this.activeModal.close('closed');
  }
}
