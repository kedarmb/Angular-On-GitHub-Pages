import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tender } from '../../model/tender.model';
import { OrganizationService } from '../../service/organization.service';
import { TenderService } from '../../service/tender.service';

// import form validator
import { TenderModalFormControl } from './tender-modal-validator'
import { TenderModalFormGroup } from './tender-modal-validator';

//



@Component({
    selector: 'app-tender-modal',
    templateUrl: './tender-modal.component.html',
    styleUrls: ['./tender-modal.component.scss']
})
export class TenderModalComponent implements OnInit {

    @Input('tender')
    tender: Tender;
    placement = 'bottom';

    tenderForm: TenderModalFormGroup = new TenderModalFormGroup();
    formSubmitted: boolean = false;

    constructor(public activeModal: NgbActiveModal, private tenderService: TenderService) {
    }

    ngOnInit() {
        this.convertToNgbDate();
    }

    dateChanged(control){
        console.log(control);
    }


    save(tenderForm) {
        this.formSubmitted = true;
        //console.log('open date is ',this.tenderForm.controls.openDate.value.year);
        // 
        this.convertToDate();
        //
        console.log(this.tender.id)
        if (this.tender.id) {
            this.tenderService.update(this.tender).subscribe((data) => {
                console.log('data is.. ',data);
                this.activeModal.close('');
            })
        } else {
            console.log('else block');
            this.tender.clientName = this.tenderForm.controls.clientName.value;
            this.tender.name = this.tenderForm.controls.tenderName.value;
            //
            this.tenderService.add(this.tender).subscribe(() => {
                this.activeModal.close('');
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
        this.tender.openDate = new Date(this.tenderForm.controls.openDate.value.year,
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
            this.tenderForm.controls.quoteEndDate.value.day);
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
