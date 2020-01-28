
import { Component, OnInit, Inject } from '@angular/core';
// import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/shared/core/service/http.service';
import Organization from 'app/shared/core/model/organization.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notify-subcontractor',
  templateUrl: './notify-subcontractor.component.html',
  styleUrls: ['./notify-subcontractor.component.scss'],
  // providers: [MatDialogRef]
})
export class NotifySubcontractorComponent implements OnInit {
  inviteSub: FormGroup;
  [x: string]: any;
  clicked: true;

  organizations: any = [];
  constructor(/* private activeModal: NgbActiveModal, */ private httpService: HttpService,
    public subContDialogueRef: MatDialogRef<NotifySubcontractorComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.inviteSub = this.fb.group({
      orgData: this.fb.array([], [Validators.required])
    })
  }

  ngOnInit() {
    this.getOrganization();
  }

  onCheckboxChange(e) {
    const orgData: FormArray = this.inviteSub.get('orgData') as FormArray;
    if (e.target.checked) {
      orgData.push(new FormControl(e.target.value));
    } else {
      console.log('return:', e.target.value);
      orgData.value.map((item: FormControl, i) => {
        if (item === e.target.value) {
          orgData.removeAt(i);
          return;
        }
      });
    }
  }

  getOrganization() {
    this.httpService.getAllOrganization()
      .subscribe((response: any) => {
        if (response.status === 200) {
          const organizations = response.body;
          console.log(organizations)
          this.organizations = organizations.filter((obj) => {
            console.log('obj', obj);
            if (obj.orgType[0] === 'Sub') {
              return obj
            }
          })
        }
      }, error => {
        this.toastr.error(error.error.message)
      })
  }

  submitForm() {
    console.log(this.inviteSub.value)
  }

  close() {
    this.subContDialogueRef.close(this.data);
    console.log('dialog closed ', this.data)
  }

}
