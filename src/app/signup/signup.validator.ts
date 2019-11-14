import {FormControl, FormGroup, Validators} from '@angular/forms';
// import { PasswordValidator } from './password.validator';
// import { AbstractControl } from "@angular/forms";
export class SignupFormControl extends FormControl {
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
                    case 'label==password':
                        messages.push("hello world");
                        break;
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

export class SignupFormGroup extends FormGroup {
    constructor() {
        super({
            orgName: new SignupFormControl('Organization Name', 'orgName', '', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(30)])),
            name: new SignupFormControl('Name','name','', Validators.compose([Validators.required])),
            email: new SignupFormControl('Email', 'email', '', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
            password:new SignupFormControl('Password','password','', Validators.compose([Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')])),
            confirmPassword:new SignupFormControl('Confirm Password','confirmPassword','', Validators.compose([Validators.required]))
        })
    }

    get parentalControls(): SignupFormControl[] {

        return Object.keys(this.controls).map((k) => this.controls[k] as SignupFormControl);
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        this.parentalControls.forEach(c => c.getValidationMessages().forEach(m => messages.push(m)));
        return messages;
    }


}
