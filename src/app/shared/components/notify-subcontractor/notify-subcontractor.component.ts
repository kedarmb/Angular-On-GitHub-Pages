import { Component, OnInit, Inject, Input } from '@angular/core';
// import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import Organization from 'app/shared/core/model/organization.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';

export enum ModalPurpose {
  toAdd, // First tab
  toNotify // Second tab
}
//
@Component({
  selector: 'app-notify-subcontractor',
  templateUrl: './notify-subcontractor.component.html',
  styleUrls: ['./notify-subcontractor.component.scss']
  // providers: [MatDialogRef]
})
export class NotifySubcontractorComponent implements OnInit {
  @Input() tendId: any;
  inviteSubForm: FormGroup;
  notifySubForm: FormGroup;
  //
  _purpose: ModalPurpose;
  selectedTab: ModalPurpose;
  // notifyClicked: boolean;

  private _searchByArea: string;

  // inviteSubForms;
  organizations: any = [];
  filteredOrganizations: any = [];
  inviteSubForms: any = [];
  emailList: any = [];
  checkedIds: any = [];
  notifiedSubList: any = [];
  //

  constructor(
    private httpService: HttpService,
    private helper: HelperService,
    public subContDialogueRef: MatDialogRef<NotifySubcontractorComponent>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.inviteSubForm = this.fb.group({
      organizationIds: this.fb.array([], [Validators.required])
    });
  }

  ngOnInit() {
    this._purpose = ModalPurpose.toAdd;
    this.selectedTab = ModalPurpose.toAdd;
    this.getOrganization();
    this.getNotifiedSub();
    this.initializeAddForm();
    this.initializeNotifyForm();
  }
  get searchByArea(): string {
    return this._searchByArea;
  }

  initializeAddForm() {
    this.inviteSubForm = this.fb.group({
      tenderid: []
    });
  }

  initializeNotifyForm() {
    this.notifySubForm = this.fb.group({
      tenderid: [],
      message: []
    });
  }

  onTabChanged(evt) {
    evt.index == 1 ? (this._purpose = ModalPurpose.toNotify) : (this._purpose = ModalPurpose.toAdd);
    this.selectedTab = this._purpose;
    /* console.log('purpose is ...', this._purpose);
    if (this._purpose == ModalPurpose.toNotify && this.notifySubForm == undefined) {
      console.log('initialized notify form');
      this.initializeNotifyForm();
    } */
  }
  set searchByArea(value: string) {
    this._searchByArea = value;
    this.filteredOrganizations = this.filterOrgs(value);
  }

  filterOrgs(searchString: string) {
    if (searchString) {
      return this.organizations.filter(org => {
        const result = org.serviceArea.filter(obj => {
          if (obj.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
            return obj;
          }
        });
        const res2 = org.serviceType.filter(obj => {
          if (obj.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
            return obj;
          }
        });
        const res3 = [...result, ...res2];
        if (res3 && res3.length) {
          return org;
        }
      });
    } else {
      return (this.filteredOrganizations = this.organizations);
    }
  }

  onCheckboxChange(e, orgObj) {
    // console.log('event is ', e.target.value, '...', e.target);
    //
    if (e.target.checked == true) {
      // orgData.push(new FormControl(e.target.value));
      this.checkedIds.push(orgObj._id);
      this.emailList.push(orgObj.contactEmail);
      //
    } else if (e.target.checked == false) {
      //
      this.checkedIds.map((item, i) => {
        if (item === orgObj._id) {
          this.checkedIds.splice(i, 1);
          return;
        }
      });
      //
      if (this._purpose == ModalPurpose.toNotify) {
        this.emailList.map((mailID, i) => {
          if (mailID === orgObj.contactEmail) {
            this.emailList.splice(i, 1);
            return;
          }
        });
      }
    }

    // console.log('checked data ... ', this.checkedIds);
  }

  defaultcheck(id) {
    if (this.inviteSubForms.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  getOrganization() {
    const allOrgs = this.helper.getOrgList();
    this.organizations = allOrgs.filter(obj => {
      if (obj.orgType[0] === 'Sub') {
        return obj;
      }
    });
    this.filteredOrganizations = this.organizations;
    // console.log('organizations are .. ', this.organizations);
  }

  getNotifiedSub() {
    this.httpService.getNotifiedSubs(this.data.tenderID).subscribe(
      (response: any) => {
        console.log('response for get notified .. ', response);
        if (response.status === 200) {
          this.spinner.hide();
          if (response.body && response.body.headerLevelNotifiedSubs && response.body.headerLevelNotifiedSubs.length) {
            const organizations = response.body.headerLevelNotifiedSubs;
            // clear out notified sub list array & email list
            this.notifiedSubList = [];
            this.emailList = [];
            //
            for (let i = 0, len = this.filteredOrganizations.length; i < len; i++) {
              // tslint:disable-next-line: no-shadowed-variable
              for (let j = 0, len = organizations.length; j < len; j++) {
                if (this.filteredOrganizations[i]._id === organizations[j]._id) {
                  this.filteredOrganizations[i].selected = true;
                  this.emailList.push(this.filteredOrganizations[i].contactEmail);
                  this.notifiedSubList.push(this.filteredOrganizations[i]);
                }
              }
            }
          }
        }
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error.error.message);
      }
    );
  }

  //
  saveIdsInTender() {
    const finalVal = Object.assign({}, this.inviteSubForm.value);
    finalVal.tenderId = this.data.tenderID;
    finalVal['organizationIds'] = this.checkedIds;
    //
    delete finalVal.tenderid;
    delete finalVal.message;
    console.log('final val is ... ', finalVal);
    console.log('emails are ... ', this.emailList);
    // this.isSaved = true;
    //
    this.spinner.show();
    this.httpService.inviteSubContractor(finalVal).subscribe(
      (response: any) => {
        if (response.status === 201) {
          //
          if (this._purpose == ModalPurpose.toAdd) {
            this.selectedTab = ModalPurpose.toNotify;
            this.getNotifiedSub();
          }
          this.toastr.success('Selected Sub Contractors have been saved. You can now notify them.');
        }
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Could not save Sub Contractors. Please try later.');
      }
    );
    // console.log(this.inviteSubForm.value);
  }
  sendEmail() {
    const val = Object.assign({}, this.notifySubForm.value);
    val.tenderid = this.data.tenderID;
    val.emailList = this.emailList.join(',');
    console.log('val..... ', val);

    // return;
    this.httpService.sendEmail(val).subscribe(
      (response: any) => {
        // 200 OK
        if (response.status === 200) {
          // console.log('invoked');
          // if (this.dialogRef) {
          //   this.dialogRef.close(this.resData);
          // }
          this.subContDialogueRef.close();
          this.toastr.success('Email successfully sent to the Sub Contractors.');
        }
      },
      error => {
        this.subContDialogueRef.close();
        this.toastr.error('Could not send email to the Sub Contractors! Please try later.');
      }
    );
  }

  /* private getCommaSepStr(arr): string {
    let _emailStr = '';
    for (let i = 0; i < arr.length; i++) {
      _emailStr += String(arr[i] + ',');
    }
    return _emailStr;
  } */

  closeModal() {
    this.subContDialogueRef.close();
  }
}

/*
//==================================================//
 setTimeout(() => this.spinner.show(), 0);
    return this.httpService.getAllOrganization().subscribe(
      (response: any) => {
        if (response.status === 200) {
          const organizations = response.body;
          this.organizations = organizations.filter(obj => {
            if (obj.orgType[0] === 'Sub') {
              return obj;
            }
          });
          this.filteredOrganizations = this.organizations;
        }
        this.spinner.hide();
      },
      error => {
        this.filteredOrganizations = [];
        this.toastr.error(error.error.message);
        this.spinner.hide();
      }
    ); */
