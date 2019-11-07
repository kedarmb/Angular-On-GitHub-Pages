import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginFormControl extends FormControl {
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

export class LoginFormGroup extends FormGroup {

    constructor() {
        super({
            // LoginFormControl(label: string, modelProperty: string, value: any, validator: any): 
            username: new LoginFormControl('username', 'username', '', Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])),
            //password: new LoginFormControl('password', 'password', '', Validators.required)
            password: new LoginFormControl('password', 'password', '', Validators.required)
        })
    }

    get parentalControls(): LoginFormControl[] {

        return Object.keys(this.controls).map((k) => this.controls[k] as LoginFormControl);
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        this.parentalControls.forEach(c => c.getValidationMessages().forEach(m => messages.push(m)));
        return messages;
    }


}
