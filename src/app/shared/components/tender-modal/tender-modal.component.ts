import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tender } from 'app/shared/core/model/tender.model';
// import { TenderService } from 'app/service/tender.service';
// import { Tender } from '../../model/tender.model';
import { TenderService } from '../../core/service/tender.service';
import { HelperService } from '../../core/service/helper.service';

// import form validator
/* import { TenderModalFormControl } from './tender-modal-validator'
import { TenderModalFormGroup } from './tender-modal-validator'; */
//
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { errorMsg, regex } from '../../core/constant/index';
import * as uuid from '../../../../../node_modules/uuid';
// '../../../../../node_modules/uuid';
//



@Component({
    selector: 'app-tender-modal',
    templateUrl: './tender-modal.component.html',
    styleUrls: ['./tender-modal.component.scss']
})
export class TenderModalComponent implements OnInit {

    // @Input('tender')

    tender: Tender;
    placement = 'bottom';

    // tenderForm: TenderModalFormGroup = new TenderModalFormGroup();
    //
    tenderHeaderForm: FormGroup = this.formBuider.group({
        clientName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30),
        this.helperService.customPatternValid({ pattern: regex.nameReg, msg: errorMsg.nameErr })]],
        //
        tenderName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30),
        this.helperService.customPatternValid({ pattern: regex.nameReg, msg: errorMsg.nameErr })]],
        //
        openDate: ['', Validators.required],
        closeDate: ['', Validators.required],
        quoteStartDate: ['', Validators.required],
        quoteEndDate: ['', Validators.required],
        id: uuid.v4(),
        items: []

    });
    formSubmitted = false;
    //
    quoteOpenMinDate: any;
    quoteOpenMaxDate: any;
    //
    quoteCloseMinDate: any;
    quoteCloseMaxDate: any;

    constructor(public activeModal: NgbActiveModal,
        private tenderService: TenderService,
        private formBuider: FormBuilder,
        private helperService: HelperService,
    ) {
    }

    ngOnInit() {
        console.log('in tender modal ', this.tender);
        // console.log('in tender modal ', uuid);
        this.convertToNgbDate();
        //

        /* this.tenderHeaderForm = this.formBuider.group({
            clientName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30),
            this.helperService.customPatternValid({ pattern: regex.nameReg, msg: errorMsg.nameErr })]],
            //
            tenderName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30),
            this.helperService.customPatternValid({ pattern: regex.nameReg, msg: errorMsg.nameErr })]],
            //
            openDate: ['', Validators.required],
            closeDate: ['', Validators.required],
            quoteStartDate: ['', Validators.required],
            qoteEndDate: ['', Validators.required],
            id: uuid.v4()

        }); */

        if (this.tender != null || this.tender !== undefined) {
            this.autoPopulateForEdit(this.tender);
        }

    }

    /** Added by Arup: 18 Nov 2019 */
    private autoPopulateForEdit(tender) {
        /**
         * With patchValue, you can assign values to specific controls in a FormGroup by 
         * supplying an object of key/value pairs for just the controls of interest.
        */
        /*   this.tenderHeaderForm.patchValue({
              clientName: tender.clientName,
              tenderName: tender.name,
              openDate: tender.openDate,
              closeDate: tender.closeDate,
              quoteStartDate: tender.quoteStartDate,
              quoteEndDate: tender.quoteEndDate
          }) */
        console.log(tender);
        this.tenderHeaderForm.setValue(tender);
        // this.tenderHeaderForm.controls.clientName.patchValue(tender.clientName);
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


    save(tenderForm) {
        this.formSubmitted = true;
        // console.log('open date is ',this.tenderForm.controls.openDate.value.year);
        //
        this.convertToDate();
        //
        console.log(this.tender.id)
        if (this.tender.id) {
            this.tenderService.update(this.tender).subscribe((data) => {
                console.log('data is.. ', data);
                this.activeModal.close('');
            })
        } else {
            console.log('else block');
            // this.tender.clientName = this.tenderForm.controls.clientName.value;
            // this.tender.name = this.tenderForm.controls.tenderName.value;
            // this.activeModal.close('');
            this.tenderService.add(this.tender).subscribe((success) => {
                this.activeModal.close('');
                console.log('success block ', success);
            }, (err) => {
                this.activeModal.close('');
                console.log('err block ', err);
            })
        }

    }

    close() {
        this.activeModal.dismiss('closed');
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
        /* this.tender.openDate = new Date(this.tenderForm.controls.openDate.value.year,
            this.tenderForm.controls.openDate.value.month,
            this.tenderForm.controls.openDate.value.day);
        //
        this.tender.closeDate = new Date(this.tenderForm.controls.closeDate.value.year,
            this.tenderForm.controls.closeDate.value.month,
            this.tenderForm.controls.closeDate.value.day);
        //
        this.tender.quoteStartDate = new Date(this.tenderForm.controls.quoteStartDate.value.year,
            this.tenderForm.controls.quoteStartDate.value.month,
            this.tenderForm.controls.quoteStartDate.value.day);
        //
        this.tender.quoteEndDate = new Date(this.tenderForm.controls.quoteEndDate.value.year,
            this.tenderForm.controls.quoteEndDate.value.month,
            this.tenderForm.controls.quoteEndDate.value.day); */
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
