import {FormControl, FormGroup, Validators} from '@angular/forms';
// import { PasswordValidator } from './password.validator';
// import { AbstractControl } from "@angular/forms";
export class OrganizationModalFormControl extends FormControl {
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
                        messages.push(`Please enter the ${this.label}`);
                        break;
                    case 'country':
                        messages.push(`please select the ${this.label}`);
                    case 'minlength':
                        messages.push(`A ${this.label} must be at least ${this.errors['minlength'].requiredLength} characters`);
                        break;
                    case 'maxlength':
                        messages.push(`A ${this.label} must not be more than ${this.errors['maxlength'].requiredLength} characters`);
                        break;
                    case 'pattern':
                        messages.push(`The ${this.label} is invalid`);
                        break;
                }
            }
        }
        return messages;
    }
}

export class OrganizationModalFormGroup extends FormGroup {
    constructor() {
        super({
            // name: new OrganizationModalFormControl('orgName', 'orgName', '', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(30)])),
            organization: new OrganizationModalFormControl('Organization','organization','', Validators.compose([Validators.required])),
            streetAddress: new OrganizationModalFormControl('Street Address', 'streetAddress', '', Validators.required),
            city: new OrganizationModalFormControl('City', 'city', '',Validators.required),
            province: new OrganizationModalFormControl('Province', 'province', '', Validators.required),
            country:new OrganizationModalFormControl('Country', 'country', '', Validators.required),
            serviceType: new OrganizationModalFormControl('Service Type', 'serviceType', '', Validators.required),
            serviceArea: new OrganizationModalFormControl('Service Area', 'serviceArea', '', Validators.required)
        })
    }

    get parentalControls(): OrganizationModalFormControl[] {

        return Object.keys(this.controls).map((k) => this.controls[k] as OrganizationModalFormControl);
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        this.parentalControls.forEach(c => c.getValidationMessages().forEach(m => messages.push(m)));
        return messages;
    }


}
