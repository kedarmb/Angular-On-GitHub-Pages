/**
 * Created by Arup as on 21-11-2019
 * Modified as on 
 * 
 * This file is to hold Reactive Form validation for User Creation
 * 
 */

import { FormControl, FormGroup, Validators } from '@angular/forms';

export class UserModalFormControl extends FormControl {
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
            //console.log(this.errors);
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

export class UserModalFormGroup extends FormGroup {
    // UserModalFormControl(label: string, modelProperty: string, value: any, validator: any): 
    constructor() {
        super({
            // client name: min 5, max 30, pattern all chars including special chars BUT not start & end with spcl chars.
            name: new UserModalFormControl('user name', 'username', '',
                Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30),
                Validators.pattern(/^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/)])),
            //
            // tender name is same as clent name
            email: new UserModalFormControl('email', 'email', '',
                Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30),
                Validators.pattern(/^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/)])),
            // 
            // Dates should not be blank 
            password: new UserModalFormControl('password', 'password', null, Validators.required),

            moilenum: new UserModalFormControl('mobilenum', 'mobilenum', null, Validators.required),

            /**/
        })
    }


    
    get parentalControls(): UserModalFormControl[] {
        return Object.keys(this.controls).map((k) => this.controls[k] as UserModalFormControl);
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        this.parentalControls.forEach(c => c.getValidationMessages().forEach(m => messages.push(m)));
        return messages;
    }
}