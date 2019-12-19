import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TenderService } from '../../core/service/tender.service';
import { HelperService } from '../../core/service/helper.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { regex } from '../../core/constant/index';
import { Tender } from 'app/shared/core/model/tender.model';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';





@Component({
    selector: 'app-tender-modal',
    templateUrl: './tender-modal.component.html',
    styleUrls: ['./tender-modal.component.scss']
})
export class TenderModalComponent implements OnInit {
    tender: Tender = null;
    tenderHeaderForm: FormGroup;
    tenderCloseMinDate: any; // Tender close date must be atleast 5 days from tender open date
    quoteOpenMinDate: any;
    quoteOpenMaxDate: any;
    quoteCloseMinDate: any;
    quoteCloseMaxDate: any;
    resData = {
        status: 'close', // 'close' when closed; 'add' to add form value, 'update' to update form value
        data: {}
    };

    constructor(public tenderModalRef: MatDialogRef<TenderModalComponent>,
        @Inject(MAT_DIALOG_DATA) public tData: any,
        private tenderService: TenderService,
        private formBuider: FormBuilder,
        private helperService: HelperService,
        private spinner: NgxSpinnerService
    ) {


    }

    ngOnInit() {
        this.initializeForm();
        if (this.tender != null || this.tender !== undefined) {
            // this.autoPopulateForEdit(this.tender);
        };
        console.log(this.tData);
    }

    initializeForm() {
        this.tenderHeaderForm = this.formBuider.group({
            // TODO: setup correct controls for populating this form.
            __v: [],
            tags: [],
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
            createDate: [],
            createdBy: [],
            updateDate: [],
            organizationRef: []
            // user: ['5da89960a103e032019e38ac'],
            // organization: ['5dd7a520715859802e8b2c55']
        });
        if (this.tData.data) {
            this.tenderHeaderForm.setValue(this.tData.data)
        }
    }

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
    /** Added by Arup: 18 Nov 2019 */
    private autoPopulateForEdit(tender) {
        console.log(tender);
        // this.tenderHeaderForm.reset();
        // this.tenderHeaderForm.setValue(tender);
    }

    dateChanged(control) {
        console.log(control);
    }

    setQuoteOpenDate() {
        this.quoteOpenMinDate = {
            year: this.tenderHeaderForm.controls.openDate.value.year,
            month: this.tenderHeaderForm.controls.openDate.value.month,
            day: this.tenderHeaderForm.controls.openDate.value.day + 4
        }
        //
        this.tenderCloseMinDate = {
            year: this.tenderHeaderForm.controls.openDate.value.year,
            month: this.tenderHeaderForm.controls.openDate.value.month,
            day: this.tenderHeaderForm.controls.openDate.value.day + 16
        }
    }
    setQuoteCloseDate() {
        /** Max Open date is 4 days prior to tender close date */
        this.quoteOpenMaxDate = {
            year: this.tenderHeaderForm.controls.closeDate.value.year,
            month: this.tenderHeaderForm.controls.closeDate.value.month,
            day: this.tenderHeaderForm.controls.closeDate.value.day - 4
        }
        /** Min Close date is 10 days prior to tender close date */
        this.quoteCloseMinDate = {
            year: this.tenderHeaderForm.controls.closeDate.value.year,
            month: this.tenderHeaderForm.controls.closeDate.value.month,
            day: this.tenderHeaderForm.controls.closeDate.value.day - 10
        }
        //
        /** Max Close date is 4 days prior to tender close date */
        this.quoteCloseMaxDate = {
            year: this.tenderHeaderForm.controls.closeDate.value.year,
            month: this.tenderHeaderForm.controls.closeDate.value.month,
            day: this.tenderHeaderForm.controls.closeDate.value.day - 4
        }
    }


    save() {

        if (this.tData.val) {
            this.tenderService.update(this.tender)
                .subscribe(response => {
                    this.resData.data = response;
                    this.resData.status = 'update';
                    this.tenderModalRef.close(response);
                })
        }
        
        if (!this.tData.val) {
            // this.spinner.show();
            // console.log(moment().toISOString(this.tenderHeaderForm.value.openDate));
            this.tenderHeaderForm.patchValue({
                openDate: moment().toISOString(this.tenderHeaderForm.value.openDate),
                closeDate: moment().toISOString(this.tenderHeaderForm.value.closeDate),
                quoteStartDate: moment().toISOString(this.tenderHeaderForm.value.quoteStartDate),
                quoteEndDate: moment().toISOString(this.tenderHeaderForm.value.quoteEndDate),
            })
            this.tenderService.add(this.tenderHeaderForm.value)
                .subscribe(response => {
                    this.resData.data = response;
                    this.resData.status = 'add';
                    this.tenderModalRef.close(this.resData);
                }, (err) => {
                    console.log('err block ', err);
                })
        }
    }

    close() {
        this.resData.status = 'close';
        this.tenderModalRef.close(this.resData);
    }

    convertToNgbDate() {

        this.tender.openDate = new Date(this.tender.openDate);
        this.tender.closeDate = new Date(this.tender.closeDate);
        this.tender.quoteStartDate = new Date(this.tender.quoteEndDate);
        this.tender.quoteEndDate = new Date(this.tender.quoteStartDate);
        this.tender.openDate = {
            year: this.tender.openDate.getFullYear(),
            month: this.tender.openDate.getMonth(),
            day: this.tender.openDate.getDay()
        };
        this.tender.closeDate = {
            year: this.tender.closeDate.getFullYear(),
            month: this.tender.closeDate.getMonth(),
            day: this.tender.closeDate.getDay()
        };
        this.tender.quoteStartDate = {
            year: this.tender.quoteStartDate.getFullYear(),
            month: this.tender.quoteStartDate.getMonth(),
            day: this.tender.quoteStartDate.getDay()
        };
        this.tender.quoteEndDate = {
            year: this.tender.quoteEndDate.getFullYear(),
            month: this.tender.quoteEndDate.getMonth(),
            day: this.tender.quoteEndDate.getDay()
        };

    }


    /**
     * Function modified by Arup 8-11-2019
     *
     */
    convertToDate() {
        // Tender object populated from FormControls:
        /* this.tender.openDate = new Date(this.tenderHeaderForm.controls.openDate.value.year,
            this.tenderHeaderForm.controls.openDate.value.month,
            this.tenderHeaderForm.controls.openDate.value.day);
        //
        this.tender.closeDate = new Date(this.tenderHeaderForm.controls.closeDate.value.year,
            this.tenderHeaderForm.controls.closeDate.value.month,
            this.tenderHeaderForm.controls.closeDate.value.day);
        //
        this.tender.quoteStartDate = new Date(this.tenderHeaderForm.controls.quoteStartDate.value.year,
            this.tenderHeaderForm.controls.quoteStartDate.value.month,
            this.tenderHeaderForm.controls.quoteStartDate.value.day);
        //
        this.tender.quoteEndDate = new Date(this.tenderHeaderForm.controls.quoteEndDate.value.year,
            this.tenderHeaderForm.controls.quoteEndDate.value.month,
            this.tenderHeaderForm.controls.quoteEndDate.value.day); */
    }

    /* convertToDate() {
        this.tender.openDate = new Date(this.tender.openDate.year,
            this.tender.openDate.month, this.tender.openDate.day);
        this.tender.closeDate = new Date(this.tender.closeDate.year, this.tender.closeDate.month,
            this.tender.closeDate.day);
        this.tender.quoteStartDate = new Date(this.tender.quoteStartDate.year,
            this.tender.quoteStartDate.month, this.tender.quoteStartDate.day);
        this.tender.quoteEndDate = new Date(this.tender.quoteEndDate.year,
            this.tender.quoteEndDate.month, this.tender.quoteEndDate.day);
    } */

}
