
import { Component, OnInit, Inject, Input } from '@angular/core';
// import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/shared/core/service/http.service';
import Organization from 'app/shared/core/model/organization.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notify-subcontractor',
  templateUrl: './notify-subcontractor.component.html',
  styleUrls: ['./notify-subcontractor.component.scss'],
  // providers: [MatDialogRef]
})
export class NotifySubcontractorComponent implements OnInit {
  @Input() tendId: any;
  inviteSub: FormGroup;
  [x: string]: any;
  clicked: true;
  notifiedSubList: any;
  // inviteSubs;
  organizations: any = [];
  inviteSubs: any = [];
  constructor(/* private activeModal: NgbActiveModal, */ private httpService: HttpService,
    public subContDialogueRef: MatDialogRef<NotifySubcontractorComponent>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.inviteSub = this.fb.group({
      organizationIds: this.fb.array([], [Validators.required])
    })
  }

  ngOnInit() {
    this.getOrganization();
  }

  onCheckboxChange(e) {
    const orgData: FormArray = this.inviteSub.get('organizationIds') as FormArray;
    if (e.target.checked) {
      orgData.push(new FormControl(e.target.value));
    } else {
      orgData.value.map((item: FormControl, i) => {
        if (item === e.target.value) {
          orgData.removeAt(i);
          return;
        }
      });
    }
  }


  defaultcheck(id) {
    console.log(id)
    if (this.inviteSubs.indexOf(id) !== -1) {
      return true
    } else {
      return false
    }

  }

  getOrganization() {
    setTimeout(() => this.spinner.show(), 0)
    this.httpService.getAllOrganization()
      .subscribe((response: any) => {
        if (response.status === 200) {
          const organizations = response.body;
          this.organizations = organizations.filter((obj) => {
            if (obj.orgType[0] === 'Sub') {
              return obj
            }
          })
        }
        this.spinner.hide();
      }, error => {
        this.toastr.error(error.error.message)
        this.spinner.hide();
      })
  
  }

  //
  submitForm() {
    const finalVal = Object.assign({}, this.inviteSub.value);
    finalVal.tenderId = this.data.tenderID;
    // console.log(finalVal);
    this.httpService.inviteSubContractor(finalVal)
      .subscribe((response: any) => {
        if (response.status === 201) {
          // this.resData.status = 'add';
          // this.resData.data = response.body;
          // this.toastr.success(response.statusText)
        }
      }, error => {
        this.toastr.error(error.error.message)
      }
      )
    console.log(this.inviteSub.value)
  }


  close() {
    this.subContDialogueRef.close();
  }

}
