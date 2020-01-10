import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HelperService } from 'app/shared/core/service/helper.service';
import { HttpService } from 'app/shared/core/service/http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-trench-modal',
  templateUrl: './trench-modal.component.html',
  styleUrls: ['./trench-modal.component.scss']
})
export class TrenchModalComponent implements OnInit {
  trenchForm: FormGroup;
  @Output() public labourData = new EventEmitter();
  resData = {
    status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
    data: ''
  };

  beddingVol
  backfillVol
  pipeVol
  effectiveVolume: any;
  effectiveWeight: number;
  backfillWeight
  beddingWeight: number;
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
    this.trenchForm = this.fb.group({
      _id: [''],
      calculationName: [''],
      beddingLength: [''],
      beddingWidth: [''],
      beddingHeight: [''],
      beddingVolume: [''],
      beddingWeight: [''],
      pipeDiameter: [''],
      pipeVolume: [''],
      pipeHeight: [''],
      effectiveVolume: [''],
      densityBedding: [''],
      backfillDensity: [''],
      backfillLength: [''],
      backfillWidth: [''],
      backfillHeight: [''],
      backfillVolume: [''],
      backfillWeight: ['']
    });
  }

  beddingVolCalc() {
    this.beddingVol = this.trenchForm.get('beddingLength').value *
      this.trenchForm.get('beddingHeight').value * this.trenchForm.get('beddingWidth').value;
    if (!this.beddingVol) {
      this.beddingVol = 0;
    }
    this.trenchForm.get('beddingVolume').patchValue(this.beddingVol.toFixed(2));
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
    // this.trenchForm.get('beddingLength').patchValue(this.trenchForm.get('backfillLength').value);
    // this.trenchForm.get('beddingWidth').patchValue(this.trenchForm.get('backfillWidth').value);
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
          this.resData.data = response.body.trenchForm;
          this.toastr.success(response.statusText)
        }
      }, error => {
        this.toastr.error(error.error.message)
      }
      )
  };

  removeTrench(val, e) {
    this.httpService.deleteOrganization(val._id)
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.toastr.success('Removed Successfully')
        }
      }, error => {
        this.toastr.error(error.error.message)
      })
  }
}
