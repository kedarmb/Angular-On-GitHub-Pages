import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { TenderService } from '../../core/service/tender.service';
import { HelperService } from '../../core/service/helper.service';
import { HttpService } from '../../core/service/http.service'
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { regex, modeOfSubmission } from '../../core/constant/index';
import { Tender } from 'app/shared/core/model/tender.model';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
    selector: 'app-tender-modal',
    templateUrl: './tender-modal.component.html',
    styleUrls: ['./tender-modal.component.scss']
})
export class TenderModalComponent implements OnInit {
    tender: Tender = null;
    tenderHeaderForm: FormGroup;
    tenderOpenMinDate: any;
    tenderCloseMinDate: any; // Tender close date must be atleast 5 days from tender open date
    quoteOpenMinDate: any;
    quoteCloseMaxDate: any;
    quoteCloseMinDate: any;
    public disableSecond = true;


    resData = {
        status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
        data: {}
    };
    injectedData: any;
    allClients: Array<any> = [];
    clientList: Observable<any[]>;
    submitModes = modeOfSubmission;

    constructor(public tenderModalRef: MatDialogRef<TenderModalComponent>,
        @Inject(MAT_DIALOG_DATA) public tData: any,
        private httpServ: HttpService,
        private formBuider: FormBuilder,
        private hs: HelperService,
        private toastr: ToastrService, private spinner: NgxSpinnerService,
    ) {

    }

    ngOnInit() {
        // set quote open date to todays date
        this.tenderOpenMinDate = moment().format();
        // this.allClients = [...(JSON.parse(this.hs.getFromLocalStorage('orgList')))];
        this.filterOrgListToClients([...(JSON.parse(this.hs.getFromLocalStorage('orgList')))]);
        //
        if (this.tData.value) {
            // this.dialogRef.componentInstance.data = {numbers: value};
            // this.tData.data.openDate = moment().toISOString(this.tData.data.openDate);
            this.injectedData = Object.assign({}, this.tData.tender);   // making a clone as tData is Composite data

            // this.injectedData.openDate = moment().toISOString(this.injectedData.openDate);
            this.injectedData.openDate = moment(this.injectedData.openDate).toISOString();
            this.injectedData.closeDate = moment(this.injectedData.closeDate).toISOString();
            this.injectedData.quoteStartDate = moment(this.injectedData.quoteStartDate).toISOString();
            this.injectedData.quoteEndDate = moment(this.injectedData.quoteEndDate).toISOString();
            //


        }

        this.initializeForm();
        //
    }
    // function to filter out only CLIENT type organization
    filterOrgListToClients(list) {
        this.allClients = list.filter(item => item.orgType[0] === 'Client');
    }

    initializeForm() {
        this.tenderHeaderForm = this.formBuider.group({
            _id: [],
            headerLevelNotifiedSubs: [],
            sections: [],
            clientName: this.formBuider.group({
                _id: '',
                name: ['', [Validators.required, this.customValidator({ pattern: regex.nameReg })]]
            }),
            name: ['', [Validators.required, this.customValidator({ pattern: regex.nameReg })]],
            description: ['', Validators.required],
            openDate: ['', Validators.required],
            closeDate: ['', Validators.required],
            quoteStartDate: ['', Validators.required],
            quoteEndDate: ['', Validators.required],
            submissionMode: ['', Validators.required],
        });

        this.clientList = this.tenderHeaderForm.get('clientName').valueChanges
            .pipe(
                startWith(''),
                map(v => v ? this.filteredClients(v) : this.allClients.slice())
            );

        this.tenderHeaderForm.get('openDate').valueChanges.subscribe(() => {
            console.log('value changes invoked')
            this.setMinDate();
        })
        //
        this.tenderHeaderForm.get('closeDate').valueChanges.subscribe(() => {
            this.quoteCloseMaxDate = this.tenderHeaderForm.controls.closeDate.value;
        });
        //
        this.tenderHeaderForm.get('quoteStartDate').valueChanges.subscribe(() => {
            this.quoteCloseMinDate = this.tenderHeaderForm.controls.quoteStartDate.value;
        });
        //
        if (this.injectedData) {
            //
            delete this.injectedData.itemRef;
            delete this.injectedData.sectionRef;
            delete this.injectedData.__v;
            // delete this.injectedData._id;
            delete this.injectedData.status;
            delete this.injectedData.createDate;
            delete this.injectedData.createdBy;
            delete this.injectedData.updateDate;
            delete this.injectedData.updatedBy;
            delete this.injectedData.organizationRef;
            //
            delete this.injectedData.createdAt;
            delete this.injectedData.updatedAt;
            //
            this.tenderHeaderForm.setValue(this.injectedData);
            // console.log(this.tenderHeaderForm.value);
        }
        //

    }

    private filteredClients(value: any): any {
        if (value && value.name) {
            const filterValue = value.name.toString().toLowerCase();
            return this.allClients.filter(client => client.name.toString().toLowerCase().indexOf(filterValue) !== -1);
        }
    }
    //
    removeNonExistentClient(event) {
        // method invoked from HTML
        setTimeout(() => {
            const isValueTrue = this.allClients.filter(client =>
                client.name === event.target.value);
            // console.log('is value true is : ', isValueTrue);
            if (isValueTrue.length === 0) {
                this.toastr.warning('Please chose a client from the dropdown only.');
                this.tenderHeaderForm.get('clientName').patchValue('');
            }
        }, 300);
    }
    //
    private customValidator(param): ValidatorFn {
        //
        let msg: string;
        let isValid = true;
        return (ctrl: FormControl) => {
            //
            const userInput = ctrl.value;
            const regexp: RegExp = param.pattern;
            //
            if (String(userInput).length < 5) {
                msg = 'Input must be at least 5 characters long'; isValid = false;
            } else if (String(userInput).length > 30) {
                msg = 'Input must not exceed 30 characters'; isValid = false;
            } else if (!String(userInput).match(regexp)) {
                msg = 'Input must not start or end with special characters'; isValid = false;
            } else if (userInput == null) {
                // String(userInput).length === 0 &&
                msg = null;
            } else {
                return null
            }
            return {
                invalidMsg: msg
            };
        }
    }

    /** Method invoked from Template HTML  */
    setMinDate() {
        if (this.tenderHeaderForm.controls.openDate.value != null) {
            this.tenderCloseMinDate = this.tenderHeaderForm.controls.openDate.value;
            //
            this.tenderHeaderForm.get('closeDate').enable();
            this.tenderHeaderForm.get('quoteStartDate').enable();
            this.tenderHeaderForm.get('quoteEndDate').enable();
        } else if (this.tenderHeaderForm.controls.openDate.value == null) {
            this.tenderHeaderForm.get('closeDate').reset();
            this.tenderHeaderForm.get('closeDate').disable();
            this.tenderHeaderForm.get('quoteStartDate').reset();
            this.tenderHeaderForm.get('quoteStartDate').disable();
            this.tenderHeaderForm.get('quoteEndDate').reset();
            this.tenderHeaderForm.get('quoteEndDate').disable();
        }
    }

    save() {
        this.spinner.show();
        const updateData = Object.assign({}, this.tenderHeaderForm.value);
        updateData.organizationRef = this.hs.getOrgId();
        // updateData.clientName = this.hs.findClientID(updateData.clientName._id);
        updateData.clientName = updateData.clientName._id;
        //
        this.httpServ.addNewTender(updateData).subscribe((res) => {
            if (res.status === 201) {
                this.resData.status = 'add';
                this.resData.data = res.body;
                this.tenderModalRef.close(this.resData);
                this.toastr.info(res.statusText);
                this.spinner.hide();
            }
        }, (err) => {
            console.log('err in adding ', err);
            this.spinner.hide();
        })
    }

    update() {
        const updateData = Object.assign({}, this.tenderHeaderForm.value);
        const tenderID = updateData._id;
        updateData.clientName = updateData.clientName._id;
        // updateData.clientName = this.hs.findClientID(updateData.clientName);
        this.httpServ.updateTender(tenderID, updateData).subscribe((res) => {
            if (res.status === 200) {
                this.resData.status = 'update';
                this.resData.data = res.body;
                this.tenderModalRef.close(this.resData);
                this.toastr.info(res.statusText);
                this.spinner.hide();
            }
        }, (err) => {
            this.spinner.hide();
            console.log('err in updating ', err);
        })
    }
    getClientID(_id, name) {
        this.tenderHeaderForm.get('clientName').setValue({ _id, name })
    }
    //
    close() {
        this.resData.status = 'close';
        this.resData.data = null;
        this.tenderModalRef.close(this.resData);
    }

    /* private findClientID(name: string, data) {
        const client = data.find(item => item.name === name)
        // console.log(name + ' ......' + client);
        return client._id;
    }
    private findClientNameById(id, data) {
        const client = data.find(item => item._id === id)
        // console.log(name + ' ......' + client);
        return client.name;
    } */

}
