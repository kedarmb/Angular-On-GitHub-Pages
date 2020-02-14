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
  beddingVol
  backfillVol
  pipeVol
  effectiveVolume: any;
  effectiveWeight: number;
  backfillWeight
  beddingWeight
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
      this.beddingWeight = (this.beddingVol - Math.PI * Math.pow(this.trenchForm.get('pipeDiameter').value / 2, 2) *
        this.trenchForm.get('pipeHeight').value) * this.trenchForm.get('densityBedding').value;
      this.trenchForm.get('beddingWeight').patchValue(this.beddingWeight.toFixed(2));
      if (this.beddingVol && this.pipeVol) {
        this.getFinalValues();
      }
    } else {
      this.toastr.show('please complete Bedding volume calculation');
    }
  }

  backfillWeightCalc() {
    if (this.backfillVol) {
      this.backfillWeight = this.backfillVol * this.trenchForm.get('backfillDensity').value;
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
    const finalVal = this.trenchForm.value
    delete finalVal._id;
    delete finalVal.updateDate;
    this.httpService.createTrenchUrl(finalVal)
      .subscribe((response: any) => {
        if (response.status === 201) {
          this.resData.status = 'add';
          this.resData.data = response.body;
          this.toastr.success(response.statusText);
          this.trenchData.emit(this.resData);
          this.trenchForm.reset();
        }
      }, error => {
        this.toastr.error(error.error.message)
      }
      )
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
}
