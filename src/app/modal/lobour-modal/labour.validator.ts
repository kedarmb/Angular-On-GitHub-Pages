import {FormControl, FormGroup, Validators} from '@angular/forms';

export class LabourFormControl extends FormControl {
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
                        messages.push(`The ${this.label} is invalid`);
                        break;
                }
            }
        }
        return messages;
    }
}

export class LabourFormGroup extends FormGroup {
    constructor() {
        super({
            name: new LabourFormControl('Name','name','', Validators.compose([Validators.required])),
            description: new LabourFormControl('Description', 'description', '', Validators.compose([Validators.required])),
            rate:new LabourFormControl('Rate','rate','', Validators.compose([Validators.required])),
            type:new LabourFormControl('Type','type','', Validators.compose([Validators.required]))
        })
    }

    get parentalControls(): LabourFormControl[] {

        return Object.keys(this.controls).map((k) => this.controls[k] as LabourFormControl);
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        this.parentalControls.forEach(c => c.getValidationMessages().forEach(m => messages.push(m)));
        return messages;
    }


}
