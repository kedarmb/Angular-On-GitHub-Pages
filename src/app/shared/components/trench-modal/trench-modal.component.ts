import { Component, OnInit, Output, EventEmitter, Inject, Optional, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'app/shared/core/service/helper.service';
import { HttpService } from 'app/shared/core/service/http.service';
import { ToastrService } from 'ngx-toastr';
// import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material';
import { Trench } from 'app/shared/core/model/trench.model';

@Component({
  selector: 'app-trench-modal',
  templateUrl: './trench-modal.component.html',
  styleUrls: ['./trench-modal.component.scss']
})
export class TrenchModalComponent implements OnInit {
  trenchForm: FormGroup;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @Input() admin: false;
  @Output() public trenchData = new EventEmitter();
  formSubmitted = false;
  resData = {
    status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
    data: ''
  };
  trench: Trench[];
  beddingVol;
  backfillVol;
  pipeVol;
  effectiveVolume: any;
  effectiveWeight: number;
  backfillWeight;
  beddingWeight;
  //
  preBuiltTrenchs = [];
  lengths = [
    { value: 'metre', viewValue: 'metre' },
    { value: 'foot', viewValue: 'foot' },
    { value: 'inch ', viewValue: 'inch' },
    { value: 'yard ', viewValue: 'yard' },
  ];
  mass = [
    { value: 'gram', viewValue: 'gram' },
    { value: 'kilogram', viewValue: 'kilogram' },
    { value: 'ton', viewValue: 'ton' },
    { value: 'pound ', viewValue: 'pound' },
  ];
  _payload: any;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    // @Optional() @Inject(MAT_DIALOG_DATA) private modal: MatDialogClose,
    private httpService: HttpService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private helperService: HelperService,
    @Optional() private dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit() {
    this._payload = this.data;
    console.log('_payload .. ', this._payload);
    this.getAllTrenchs();
    //
    this.getTrenchCalForm();
    if (this.data != null && this.data.val === true) {
      const newVal = Object.assign({}, this.data.data)
      delete newVal.__V
      delete newVal.createDate
      delete newVal.updateDate
      this.trenchForm.setValue(newVal)
    }
  }

  getTrenchCalForm() {
    this.trenchForm = this.fb.group({
      _id: [''],
      calculationName: ['', Validators.required],
      beddingLength: ['', Validators.required],
      beddingWidth: ['', Validators.required],
      beddingHeight: ['', Validators.required],
      beddingVolume: ['', Validators.required],
      beddingWeight: ['', Validators.required],
      pipeDiameter: ['', Validators.required],
      pipeVolume: ['', Validators.required],
      pipeHeight: ['', Validators.required],
      effectiveVolume: ['', Validators.required],
      backfillDensity: ['', Validators.required],
      densityBedding: ['', Validators.required],
      backfillLength: ['', Validators.required],
      backfillWidth: ['', Validators.required],
      backfillVolume: ['', Validators.required],
      backfillHeight: ['', Validators.required],
      backfillWeight: ['', Validators.required]
    });
  }

  beddingVolCalc() {
    // this.beddingVol = this.trenchForm.get('beddingLength').value *
    //   this.trenchForm.get('beddingHeight').value * this.trenchForm.get('beddingWidth').value;
    // if (!this.beddingVol) {
    //   this.beddingVol = 0;
    // }
    // this.trenchForm.get('beddingVolume').patchValue(this.beddingVol.toFixed(2));
    this.trenchForm.get('backfillLength').patchValue(this.trenchForm.get('beddingLength').value);
    this.trenchForm.get('backfillWidth').patchValue(this.trenchForm.get('beddingWidth').value);
  }

  backfillVolCalc() {
    this.backfillVol = this.trenchForm.get('backfillLength').value *
      this.trenchForm.get('backfillHeight').value * this.trenchForm.get('backfillWidth').value;
    if (!this.backfillVol) {
      this.backfillVol = 0;
    }
    this.trenchForm.get('backfillVolume').patchValue(this.backfillVol.toFixed(2));
  }

  pipeVolumeCalc() {
    this.pipeVol = Math.PI * Math.pow(this.trenchForm.get('pipeDiameter').value / 2, 2) *
      this.trenchForm.get('pipeHeight').value;
    if (!this.pipeVol) {
      this.pipeVol = 0;
    }
    this.trenchForm.get('pipeVolume').patchValue(this.pipeVol.toFixed(2));
    if (this.beddingVol && this.pipeVol) {
      this.getFinalValues();
    }
  }
  getFinalValues() {
    this.trenchForm.get('pipeVolume').valueChanges.subscribe(() => {
      this.finalVolumeCalc();
    })
    this.trenchForm.get('beddingVolume').valueChanges.subscribe(() => {
      this.finalVolumeCalc();
    })
  }

  beddingWeightCalc() {
    if (this.beddingVol) {
      // this.beddingWeight = (this.beddingVol - Math.PI * Math.pow(this.trenchForm.get('pipeDiameter').value / 2, 2) *
      //   this.trenchForm.get('pipeHeight').value) * this.trenchForm.get('densityBedding').value;
      // this.trenchForm.get('beddingWeight').patchValue(this.beddingWeight.toFixed(2));
      this.beddingWeight =
        (this.beddingVol - this.trenchForm.value.pipeVolume) * this.trenchForm.get('densityBedding').value;
      if (this.beddingVol && this.pipeVol) {
        this.getFinalValues();
      }
    } else {
      this.toastr.show('please complete Bedding volume calculation');
    }
  }

  backfillWeightCalc() {
    if (this.backfillVol) {
      this.backfillWeight = this.trenchForm.value.backfillVolume * this.trenchForm.get('backfillDensity').value;
      this.trenchForm.get('backfillWeight').patchValue(this.backfillWeight.toFixed(2));
    } else {
      this.toastr.show('please complete Backfill volume calculation');
    }
  }

  finalVolumeCalc() {
    if (this.pipeVol && this.beddingVol) {
      this.effectiveVolume = this.pipeVol - this.beddingVol;
      this.trenchForm.get('effectiveVolume').patchValue(this.effectiveVolume.toFixed(2));
    }
  }
  finalWeightCalc() {
    // this.effectiveWeight = this.effectiveVolume * this.trenchForm.densityBedding
    // }
    // backfillCalc(){
    //   const backfillWeight = (this.trenchForm.backfillHeight * this.trenchForm.beddingHeight *
    // this.trenchForm.beddingWidth) * this.trenchForm.backfillDensity
    // }
  }

  save() {
    // /v1/trench/tender/:tenderId/section/:sectionId/lineItem/:lineItemId
    const tenderId = this._payload.tender;
    const secID = this._payload.section;
    const lineID = this._payload.lineItem
    const appendStr = '/tender/' + tenderId + '/section/' + secID + '/lineItem/' + lineID;
    console.log('append string ', appendStr);
    console.log('payload is : ', this._payload);
    //
    //return;
    this.httpService.saveTrenchForLineItem(appendStr, this._payload).subscribe((response) => {
      console.log('success ', response);
      if (response.status === 201) {
        this.resData.status = 'add';
        this.resData.data = response.body;
        this.dialogRef.close(this.resData);
        this.toastr.success('Trench for Line Item saved');
      }
    }, (err) => {
      console.log('err saving trench ', err);
    })
  };

  calculate() {
    /**
     * Bedding volume calculation
     */
    this.beddingVol = (this.trenchForm.get('beddingLength').value *
      this.trenchForm.get('beddingHeight').value * this.trenchForm.get('beddingWidth').value);
    this.trenchForm.get('beddingVolume').patchValue(this.beddingVol.toFixed(2));
    console.log('this.beddingVol:', this.beddingVol);

    /**
     * Backfill volume calculation
     */
    this.backfillVol = this.trenchForm.get('backfillLength').value *
      this.trenchForm.get('backfillHeight').value * this.trenchForm.get('backfillWidth').value;
    this.trenchForm.get('backfillVolume').patchValue(this.backfillVol.toFixed(2));
    console.log('this.backfillVol:', this.backfillVol);

    /**
     * Pipe volume calculation
     */
    this.pipeVol = (Math.PI * Math.pow(this.trenchForm.get('pipeDiameter').value / 2, 2) *
      this.trenchForm.get('pipeHeight').value);
    this.trenchForm.get('pipeVolume').patchValue(this.pipeVol.toFixed(2));
    console.log('this.pipeVol:', this.pipeVol);

    /**
     * Bedding weight calculation
     */
    this.beddingWeight = ((this.beddingVol - Math.PI * Math.pow(this.trenchForm.get('pipeDiameter').value / 2, 2) *
      this.trenchForm.get('pipeHeight').value) * this.trenchForm.get('densityBedding').value);
    this.trenchForm.get('beddingWeight').patchValue(this.beddingWeight.toFixed(2));
    console.log(' this.beddingWeight:', this.beddingWeight);

    /**
     * Backfill weight calculation
     */
    this.backfillWeight = (this.backfillVol * this.trenchForm.get('backfillDensity').value);
    this.trenchForm.get('backfillWeight').patchValue(this.backfillWeight.toFixed(2));
    console.log('this.backfillWeight:', this.backfillWeight);

    /**
     * Effective volume calculation
     */
    this.effectiveVolume = (this.pipeVol - this.beddingVol);
    this.trenchForm.get('effectiveVolume').patchValue(this.effectiveVolume.toFixed(2));
    console.log('this.effectiveVolume:', this.effectiveVolume);

    this.trenchForm.get('pipeVolume').valueChanges.subscribe(() => {
      this.finalVolumeCalc();
    })
    this.trenchForm.get('beddingVolume').valueChanges.subscribe(() => {
      this.finalVolumeCalc();
    })

    // now update the _payload for POST

    console.log(this.trenchForm.value);
    const formVal = this.trenchForm.value;
    //
    this._payload.calculationName = formVal.calculationName;
    this._payload.beddingLength = formVal.beddingLength;
    this._payload.beddingWidth = formVal.beddingWidth;
    this._payload.beddingHeight = formVal.beddingHeight;
    this._payload.beddingVolume = formVal.beddingVolume;
    this._payload.beddingWeight = formVal.beddingWeight;
    this._payload.pipeDiameter = formVal.pipeDiameter;
    this._payload.pipeVolume = formVal.pipeVolume;
    this._payload.pipeHeight = formVal.pipeHeight;
    this._payload.effectiveVolume = formVal.effectiveVolume;
    this._payload.backfillDensity = formVal.backfillDensity;
    this._payload.densityBedding = formVal.densityBedding;
    this._payload.backfillLength = formVal.backfillLength;
    this._payload.backfillWidth = formVal.backfillWidth;
    this._payload.backfillVolume = formVal.backfillVolume;
    this._payload.backfillHeight = formVal.backfillHeight;
    this._payload.backfillWeight = formVal.backfillWeight;
  }

  updateTrenchCalculation() {
    const finaVal = Object.assign({}, this.trenchForm.value)
    delete finaVal.createDate
    console.log(finaVal);
    this.httpService.updateTrench(finaVal, this.data.data._id)
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

  close() {
    this.resData.status = 'close';
    this.dialogRef.close(this.resData);
    this.trenchForm.reset();
  }
  //
  getAllTrenchs() {
    // https://smartbid-api.herokuapp.com/v1/trench/tender/5e466533121a0841cc8ab53f/0/0
    const appendStr = '/tender/' + this._payload.tender + '/0/0';
    this.httpService.getTenderTrenchs(appendStr).subscribe((response) => {
      console.log(response);
      if (response.status === 201) {
        this.preBuiltTrenchs = response.body;
      }
    }, (err) => {
      console.log('error in fetching Trencs .. ', err);
    })
  }
}
