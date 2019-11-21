import {FormControl, FormGroup, Validators} from '@angular/forms';

export class CrewFormControl extends FormControl {
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
                        messages.push(`The ${this.label} contains illegal characters`);
                        break;
                }
            }
        }
        return messages;
    }
}

export class CrewFormGroup extends FormGroup {

    constructor() {
        super({
            crewname: new CrewFormControl('crewname', 'crewname', '', Validators.required),
            crewdescription: new CrewFormControl('crewdescription', 'crewdescription', '', Validators.required),
            equipment: new CrewFormControl('equipment', 'equipment', '', Validators.required)
        })
    }

    get parentalControls(): CrewFormControl[] {
        return Object.keys(this.controls).map((k) => this.controls[k] as CrewFormControl);
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        this.parentalControls.forEach(c => c.getValidationMessages().forEach(m => messages.push(m)));
        return messages;
    }
}
