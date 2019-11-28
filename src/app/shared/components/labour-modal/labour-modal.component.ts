import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'app/shared/core/service/helper.service';
import { regex, errorMsg } from 'app/shared/core/constant';
import { LabourService } from 'app/shared/core/service/labour.service';
import Labour from 'app/shared/core/model/labour.model';

@Component({
  selector: 'app-labour-modal',
  templateUrl: './labour-modal.component.html',
  styleUrls: ['./labour-modal.component.scss']
})
export class LabourModalComponent implements OnInit {
  labourForm: FormGroup;
    // @Input('labours')
  labours: Labour
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private helperService: HelperService,
    private laboursService: LabourService
  ) { }

  ngOnInit() {
    this.labourForm = this.fb.group({
      name: ['',       [
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
      type: ['', [Validators.required]],
      actions: ['', [Validators.required]],
    });
  }

  save(labours) {
    console.log(this.labourForm.value);
    if (labours.id) {
      this.laboursService.update(102, labours).subscribe(() => {
        this.activeModal.close('closed');
      });
    } else {
      this.laboursService.create(this.labourForm.value).subscribe(
        (response: any) => {     console.log(response);
          if (response.status === 200) {
            this.activeModal.close('closed');
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  close() {
    this.activeModal.close('closed');
  }
}
/**.......................... */
// import { Component, OnInit, Input } from '@angular/core';
// import {Component, OnInit, Input} from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HelperService } from 'app/shared/core/service/helper.service';
// import { regex, errorMsg } from 'app/shared/core/constant';
// import Labour from 'app/shared/core/model/labour.model';
// import { LabourService } from 'app/shared/core/service/labour.service';
// import { from } from 'rxjs';

// @Component({
//   selector: 'app-labour-modal',
//   templateUrl: './labour-modal.component.html',
//   styleUrls: ['./labour-modal.component.scss']
// })
// export class EquipmentsModalComponent implements OnInit {
//   labourForm: FormGroup;
//   @Input('labour')
//   labour: Labour;
//   placement = 'bottom';
//   constructor(public activeModal: NgbActiveModal,
//     private fb: FormBuilder,
//     private helperService: HelperService,
//     private labourService: LabourService) { }

//   ngOnInit() {
//     this.labourForm = this.fb.group({
//       name: [
//         '',
//         [
//           Validators.required,
//           this.helperService.customPatternValid({
//             pattern: regex.nameReg,
//             msg: String(errorMsg.nameMessage)
//           })
//         ]
//       ],
//       rate: [
//         '',
//         [
//           Validators.required,
//         ]
//       ],
//       description: ['', [Validators.required]],
//       type: ['', [Validators.required]],
//       actions: ['', [Validators.required]],
//     });
//   }
//   public subForm() {
//     console.log('this.organizationForm:', this.labourForm);
//   }
//   close() {
//     this.activeModal.close('closed');
//   }
//   save(labour) {
//     console.log(this.labourForm.value);
//     // if (organization.id) {
//     //   this.equipmentsForm.update(102, organization).subscribe(() => {
//     //     this.activeModal.close('closed');
//     //   });
//     // } else {
//     // this.organizationService.create(this.organizationForm.value).subscribe(
//     //   (response: any) => {
//     //     console.log(response);
//     //     if (response.status === 200) {
//     //       this.activeModal.close('closed');
//     //     }
//     //   },
//     //   error => {
//     //     console.log(error);
//     //   }
//     // );
//     this.labourService.create(this.labourForm.value).subscribe((response: any) => {
//       console.log(response);
//       if (response.status === 200) {
//         this.activeModal.close('closed');
//       }
//     })
//   }
// }
