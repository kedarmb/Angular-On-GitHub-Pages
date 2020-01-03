import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { TenderService } from '../../core/service/tender.service';
import { HelperService } from '../../core/service/helper.service';
import { HttpService } from '../../core/service/http.service'
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { regex } from '../../core/constant/index';
import { Tender } from 'app/shared/core/model/tender.model';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-section-modal',
  templateUrl: './section-modal.component.html',
  styleUrls: ['./section-modal.component.scss']
})
export class SectionModalComponent implements OnInit {

  sectionForm: FormGroup;
  resData = {
    status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
    data: ''
  };

  constructor(public sectionModalRef: MatDialogRef<SectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public tenderHeaderId: any,
    private httpServ: HttpService,
    private formBuider: FormBuilder,
    private toastr: ToastrService, private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.initializeForm();
    console.log(this.tenderHeaderId);
  }

  initializeForm() {
    this.sectionForm = this.formBuider.group({
      name: ['', [Validators.required]],
    });
    //


  }
  close() {
    this.resData.status = 'close';
    this.sectionModalRef.close(this.resData);
  }
  save() {
    const sectionData = Object.assign({}, this.sectionForm.value)
    // this.sectionForm.value
    // delete theaderID._id;
    sectionData.tenderRef = this.tenderHeaderId;
    // console.log(sectionData);
    // console.log(this.tenderHeaderId);
    this.httpServ.createNewSection(sectionData)
      .subscribe((response: any) => {
        console.log('createNewSection   ', response);
        if (response.status === 201) {
          this.resData.status = 'add';
          this.resData.data = response.body;
          this.sectionModalRef.close(this.resData);
          this.toastr.success(response.statusText);
        }
      }, error => {
        this.toastr.error(error.error.message)
      }
      )
  };

  update() {
    const finaVal = Object.assign({}, this.sectionForm.value)
    /* this.httpServ.updateOrganization(finaVal, this.data.data._id)
      .subscribe((response: any) => {
        if (response.status === 201) {
          this.resData.status = 'update';
          this.sectionModalRef.close(this.resData);
          this.toastr.success(response.statusText)
        }
      },
        error => {
          this.toastr.error(error.error.message)
        }
      ) */
  }


}
