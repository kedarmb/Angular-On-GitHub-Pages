
import { Component, OnInit, Inject, Input } from '@angular/core';
// import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/shared/core/service/http.service';
import Organization from 'app/shared/core/model/organization.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
  notifyClicked: boolean;
  notifiedSubList: any;
  private _searchByArea: string;


  // inviteSubs;
  organizations: any = [];
  filteredOrganizations: any = [];
  inviteSubs: any = [];
  emailList: any = [];

  constructor(private httpService: HttpService,
    public subContDialogueRef: MatDialogRef<NotifySubcontractorComponent>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.inviteSub = this.fb.group({
      organizationIds: this.fb.array([], [Validators.required])
    })
  }

  ngOnInit() {
    this.getOrganization();
    this.getNotifiedSub();
    this.initializeForm();
  }
  get searchByArea(): string {
    return this._searchByArea;
  }


  initializeForm() {
    this.inviteSub = this.fb.group({
      tenderid: [],
      message: ['']
    })
  }

  set searchByArea(value: string) {
    this._searchByArea = value;
    this.filteredOrganizations = this.filterOrgs(value)
  }

  filterOrgs(searchString: string) {
    if (searchString) {
      return this.organizations.filter(org => {
        const result = org.serviceArea.filter(obj => {
          if (obj.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
            return obj
          }
        })
        const res2 = org.serviceType.filter(obj => {
          if (obj.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
            return obj
          }
        })
        const res3 = [...result, ...res2];
        if (res3 && res3.length) {
          return org
        }
      })
    } else {
      return this.filteredOrganizations = this.organizations
    }
  }

  onCheckboxChange(e) {
    const orgData: FormArray = this.inviteSub.get('organizationIds') as FormArray;
    if (orgData && e.target.checked) {
      orgData.push(new FormControl(e.target.value));
    } else if (orgData) {
      orgData.value.map((item: FormControl, i) => {
        if (item === e.target.value) {
          orgData.removeAt(i);
          return;
        }
      });
    }
  }


  defaultcheck(id) {
    if (this.inviteSubs.indexOf(id) !== -1) {
      return true
    } else {
      return false
    }

  }

  getOrganization() {
    setTimeout(() => this.spinner.show(), 0)
    return this.httpService.getAllOrganization()
      .subscribe((response: any) => {
        if (response.status === 200) {
          const organizations = response.body;
          this.organizations = organizations.filter((obj) => {
            if (obj.orgType[0] === 'Sub') {
              return obj
            }
          })
          this.filteredOrganizations = this.organizations
        }
        this.spinner.hide();
      }, error => {
        this.filteredOrganizations = []
        this.toastr.error(error.error.message)
        this.spinner.hide();
      })

  }


  getNotifiedSub() {
    this.httpService.getNotifiedSubs(this.data.tenderID)
      .subscribe((response: any) => {
        if (response.status === 200) {

          if (response.body && response.body.headerLevelNotifiedSubs && response.body.headerLevelNotifiedSubs.length) {
            const organizations = response.body.headerLevelNotifiedSubs;
            for (let i = 0, len = this.filteredOrganizations.length; i < len; i++) {
              // tslint:disable-next-line: no-shadowed-variable
              for (let j = 0, len = organizations.length; j < len; j++) {
                if (this.filteredOrganizations[i]._id === organizations[j]._id) {
                  this.filteredOrganizations[i].selected = true;
                  this.emailList.push(this.filteredOrganizations[i].contactEmail);
                }
              }
            }
          }
        }
      }, error => {
        this.toastr.error(error.error.message)
      })
  }

  //
  submitForm() {
    const finalVal = Object.assign({}, this.inviteSub.value);
    finalVal.tenderId = this.data.tenderID;
    this.httpService.inviteSubContractor(finalVal)
      .subscribe((response: any) => {
        if (response.status === 201) {
          // this.resData.status = 'add';
          // this.resData.data = respone.body;
          this.toastr.success('Selected Sub Contractors have been notified.');
        }
      }, error => {
        this.toastr.error(error.error.message)
      }
      )
    console.log(this.inviteSub.value)
  }
  sendEmail() {
    const val = Object.assign({}, this.inviteSub.value);
    val.tenderid = this.data.tenderID;
    val.emailList = this.emailList;
    console.log('val.emailList::', val.emailList);
    delete val.status;
    this.httpService.sendEmail(val)
      .subscribe((response: any) => {
        if (response.status === 200) {
          console.log('invoked');
          if (this.dialogRef){
            this.dialogRef.close(this.resData);
          }
        }
      }, error => {
        this.toastr.error(error.error.message)
      }
      )
    this.subContDialogueRef.close();
  }


  close() {
    this.subContDialogueRef.close();
  }

}
