import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { TenderService } from '../../core/service/tender.service';
import { HelperService } from '../../core/service/helper.service';
import { HttpService } from '../../core/service/http.service'
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { regex } from '../../core/constant/index';
import { Tender } from 'app/shared/core/model/tender.model';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';






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
    // quoteOpenMaxDate: any;
    // quoteCloseMinDate: any;

    resData = {
        status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
        data: {}
    };
    injectedData: any;
    allClients: Array<any> = [];
    clientList: Observable<any[]>;

    constructor(public tenderModalRef: MatDialogRef<TenderModalComponent>,
        @Inject(MAT_DIALOG_DATA) public tData: any,
        private httpServ: HttpService,
        private formBuider: FormBuilder,
        private hs: HelperService,
        private toastr: ToastrService,
    ) {

    }

    ngOnInit() {
        console.log(this.tData);
        // set quote open date to todays date
        this.tenderOpenMinDate = moment().format();
        this.allClients = [...this.hs.getOrgList()];
        if (this.tData.value) {
            // this.dialogRef.componentInstance.data = {numbers: value};
            // this.tData.data.openDate = moment().toISOString(this.tData.data.openDate);
            this.injectedData = Object.assign({}, this.tData.tender);   // making a clone as tData is Composite data

            // this.injectedData.openDate = moment().toISOString(this.injectedData.openDate);
            this.injectedData.openDate = moment(this.injectedData.openDate).toISOString();
            // console.log(this.injectedData.openDate)
            this.injectedData.closeDate = moment(this.injectedData.closeDate).toISOString();
            this.injectedData.quoteStartDate = moment(this.injectedData.quoteStartDate).toISOString();
            this.injectedData.quoteEndDate = moment(this.injectedData.quoteEndDate).toISOString();
            //
            // this.tenderModalRef.componentInstance.data = inputData
            // console.log('tracing val  ', this.injectedData);
        }

        this.initializeForm();
        //
    }


    initializeForm() {
        this.tenderHeaderForm = this.formBuider.group({
            _id: [],
            clientName: ['', [Validators.required, this.customValidator({ pattern: regex.nameReg })]],
            //
            name: ['', [Validators.required, this.customValidator({ pattern: regex.nameReg })]],
            //
            description: ['', Validators.required],
            openDate: ['', Validators.required],
            closeDate: ['', Validators.required],
            quoteStartDate: ['', Validators.required],
            quoteEndDate: ['', Validators.required],
        });
        //

        this.clientList = this.tenderHeaderForm.get('clientName').valueChanges
            .pipe(
                startWith(''),
                map(v => v ? this.filteredClients(v) : this.allClients.slice())
            );
        //
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
            // console.log(this.injectedData);
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
            this.tenderHeaderForm.setValue(this.injectedData);
            // console.log(this.tenderHeaderForm.value);
        }
        //

    }

    private filteredClients(value: string): any {
        const filterValue = value.toLowerCase();
        // console.log(this.allClients.filter(client => client.name.toLowerCase().indexOf(filterValue) === 0))
        return this.allClients.filter(client => client.name.toLowerCase().indexOf(filterValue) === 0);
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
            //  console.log(ctrl);
            //
            return {
                invalidMsg: msg
            };
        }
    }

    /** Method invoked from Template HTML  */
    setMinDate() {
        console.log('open date value ', this.tenderHeaderForm.controls.openDate.value);
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
        this.hs.showSpinner();
        // console.log(this.tenderHeaderForm.value);
        const updateData = Object.assign({}, this.tenderHeaderForm.value);
        // const tenderID = updateData._id;
        updateData.clientName = this.hs.findClientID(updateData.clientName);
        //
        this.httpServ.addNewTender(updateData).subscribe((res) => {
            // console.log('success in adding ', res);
            //
            if (res.status === 201) {
                // console.log('success in updating ', res);
                this.resData.status = 'add';
                this.resData.data = res.body;
                this.tenderModalRef.close(this.resData);
                this.toastr.info(res.statusText);
                this.hs.hideSpinner();
            }
        }, (err) => {
            console.log('err in adding ', err);
            this.hs.hideSpinner();
        })
    }

    update() {
        // console.log(this.tenderHeaderForm.value);
        this.hs.showSpinner();
        const updateData = Object.assign({}, this.tenderHeaderForm.value);
        const tenderID = updateData._id;
        //
        console.log(updateData)
        updateData.clientName = this.hs.findClientID(updateData.clientName);
        //
        this.httpServ.updateTender(tenderID, updateData).subscribe((res) => {

            if (res.status === 201) {
                console.log('success in updating ', res);
                this.resData.status = 'update';
                this.resData.data = res.body;
                this.tenderModalRef.close(this.resData);
                this.toastr.info(res.statusText);
                this.hs.hideSpinner();
            }
        }, (err) => {
            this.hs.hideSpinner();
            console.log('err in updating ', err);
        })
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
