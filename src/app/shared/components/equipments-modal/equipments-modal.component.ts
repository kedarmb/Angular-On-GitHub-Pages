import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Equipments from 'app/shared/core/model/equipments.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'app/shared/core/service/helper.service';
import { regex, errorMsg } from 'app/shared/core/constant';
import { HttpService } from 'app/shared/core/service/http.service';

@Component({
  selector: 'app-equipments-modal',
  templateUrl: './equipments-modal.component.html',
  styleUrls: ['./equipments-modal.component.scss']
})
export class EquipmentsModalComponent implements OnInit {
  equipmentsForm: FormGroup;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private helperService: HelperService,
    private httpService: HttpService) {}

    ngOnInit() {
    this.equipmentsForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          this.helperService.customPatternValid({
            pattern: regex.nameReg,
            msg: String(errorMsg.nameMessage)
          })
        ]
      ],
      rate: [
        '',
        [
          Validators.required,
        ]
      ],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }
  public subForm() {
    console.log('this.organizationForm:', this.equipmentsForm);
  }
  close() {
    this.activeModal.close('closed');
  }
  save() {
    console.log(this.equipmentsForm.value);
    this.httpService.createEquipment(this.equipmentsForm.value).subscribe((response: any) => {
      console.log(response);
        if (response.status === 200) {
          this.activeModal.close('closed');
        }
      })
    }
}
