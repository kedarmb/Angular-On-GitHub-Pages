import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { CrewItemService } from '../../core/service/crew-item.service';
import { CrewItem } from '../../core/model/crew-item.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '../../core/service/helper.service';
import { regex, errorMsg } from '../../core/constant/index';
import { MatDialogClose, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'app/shared/core/service/http.service';
import { Crew } from 'app/shared/core/model/crew.model';
import { stringify } from 'querystring';
@Component({
  selector: 'app-crew-modal',
  templateUrl: './crew-modal.component.html',
  styleUrls: ['./crew-modal.component.scss']
})
export class CrewModalComponent implements OnInit {
  formSubmitted = false;
  createCrewForm: FormGroup;
  @Output() valueChange = new EventEmitter();
  resData = {
    status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
    data: ''
  };

  crew: Crew[];
  equipmentsData: any;

  laboursData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
    private formBuilder: FormBuilder,
    private hs: HelperService,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<any>,
    private toastr: ToastrService,
    private crewItemService: CrewItemService) {

      console.log('crew modal constructor');

    this.equipmentsData = JSON.parse(this.hs.getFromLocalStorage('equipList'));
    this.laboursData = JSON.parse(this.hs.getFromLocalStorage('labourList'));

    /* this.hs.equipmentData.subscribe((response) => {
      this.spinner.show();
      this.equipmentsData = response
      console.log(response)
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    })
    this.hs.labourData.subscribe((response) => {
      this.spinner.show();
      this.laboursData = response;
      console.log(response)
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    }) */
  }

  ngOnInit() {
    this.crewForm();
    console.log('data in crew modal:  ', this.data);
    if (this.data.val === true) {
      const newVal = Object.assign({}, this.data.data)
      delete newVal.__V
      delete newVal.createDate
      delete newVal.updateDate
      this.createCrewForm.setValue(newVal)
    }

  }
  crewForm() {
    this.createCrewForm = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      equipments: [],
      labours: []
    });
  }

  close() {
    this.resData.status = 'close';
    this.dialogRef.close(this.resData);
  }

  save() {
    // console.log(this.createCrewForm.get('equipments').value);
    // console.log(this.createCrewForm.get('labours').value);
    const finalVal = this.createCrewForm.value
    delete finalVal._id;
    delete finalVal.updateDate;
    this.httpService.createCrewTemplate(finalVal)
      .subscribe((response: any) => {
        if (response.status === 201) {
          this.resData.status = 'add';
          this.resData.data = response.body;
          this.dialogRef.close(this.resData);
          this.toastr.success(response.statusText)
        }
      }, error => {
        this.toastr.error(error.error.message)
      }
      )
  };
  updateCrew() {
    const finaVal = Object.assign({}, this.createCrewForm.value)
    delete finaVal.createDate
    console.log(finaVal);
    this.httpService.updateCrewTemplate(finaVal, this.data.data._id)
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
}
