/**
 * Created by Arup as on 05-10-2019
 * Modified as on 07-11-2019
 * 
 * This file is to hold Reactive Form validation for Tender Header Creation
 * 
 */

import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TenderModalFormControl extends FormControl {
    modelProperty: string;
    label: string;

    constructor(label: string, modelProperty: string, value: any, validator: any) {
        super(value, validator);
        this.modelProperty = modelProperty;
        this.label = label;
    }

    getValidationMessages() {
        let messages: string[] = [];
        if (this.errors) {
            for (let errorName in this.errors) {
                switch (errorName) {
                    case 'required':
                        messages.push(`You must enter a ${this.label}`);
                        break;
                    case 'minlength':
                        messages.push(`A ${this.label} must be at least ${this.errors['minlength'].requiredLength} characters`);
                        break;
                    case 'maxlength':
                        messages.push(`A ${this.label} must be no more than ${this.errors['maxlength'].requiredLength} characters`);
                        break;
                    case 'pattern':
                        messages.push(`The ${this.label} must not start with special characters or end with it`);
                        break;
                }
            }
        }
        return messages;
    }

}

export class TenderModalFormGroup extends FormGroup {
    // TenderModalFormControl(label: string, modelProperty: string, value: any, validator: any): 
    constructor() {
        super({
            // client name: min 5, max 30, pattern all chars including special chars BUT not start & end with spcl chars.
            clientName: new TenderModalFormControl('client name', 'clientname', '',
                Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30),
                Validators.pattern(/^[a-z0-9](?!.*?[^\na-z0-9]{2}).*?[a-z0-9]$/gmi)])),
            //
            // tender name is same as clent name
            tenderName: new TenderModalFormControl('tender name', 'tender name', '',
                Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30),
                Validators.pattern(/^[a-z0-9](?!.*?[^\na-z0-9]{2}).*?[a-z0-9]$/gmi)])),
            // 
            // Dates should not be blank 
            openDate: new TenderModalFormControl('open date', 'open date', '', Validators.required),

            closeDate: new TenderModalFormControl('close date', 'close date', '', Validators.required),

            quoteStartDate: new TenderModalFormControl('quote start date', 'quote start date', '', Validators.required),

            quoteEndDate: new TenderModalFormControl('quote end date', 'quote end date', '', Validators.required)
            /**/
        })
    }

    get parentalControls(): TenderModalFormControl[] {

        return Object.keys(this.controls).map((k) => this.controls[k] as TenderModalFormControl);
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        this.parentalControls.forEach(c => c.getValidationMessages().forEach(m => messages.push(m)));
        return messages;
    }
}