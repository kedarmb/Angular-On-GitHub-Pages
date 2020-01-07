// import { HttpService } from './../../core/service/http.service';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'app/shared/core/service/helper.service';
import { regex, errorMsg } from 'app/shared/core/constant';
import Labour from 'app/shared/core/model/labour.model';
import { HttpService } from 'app/shared/core/service/http.service';
// import { MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-trench-modal',
  templateUrl: './trench-modal.component.html',
  styleUrls: ['./trench-modal.component.scss']
})
export class TrenchModalComponent implements OnInit {
  trenchCalForm: FormGroup;
  @Output() public labourData = new EventEmitter();
  resData = {
    status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
    data: ''
  };


  constructor(
    private httpService: HttpService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private helperService: HelperService,
  ) { }

  ngOnInit() {
    this.getTrenchCalForm();
  }

  getTrenchCalForm() {
    this.trenchCalForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required]],
      beddingLength: ['', [Validators.required]],
      beddingWidth: ['', [Validators.required]],
      beddingHeight: ['', [Validators.required]],
      beddingVolume: ['', [Validators.required]],
      pipeDiameter: ['', [Validators.required]],
      pipeVolume: ['', [Validators.required]],
      effectiveVolume: ['', [Validators.required]],
      densityBedding: ['', [Validators.required]],
      beddingWeight: ['', [Validators.required]],
      backfillLength: ['', [Validators.required]],
      backfillWidth: ['', [Validators.required]],
      backfillHeight: ['', [Validators.required]],
      backfillVolume: ['', [Validators.required]],
      backfillDensity: ['', [Validators.required]],
      backfillWeight: ['', [Validators.required]]
    });
  }
}
