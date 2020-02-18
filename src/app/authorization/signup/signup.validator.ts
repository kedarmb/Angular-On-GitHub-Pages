import {FormControl, FormGroup, Validators} from '@angular/forms';
export class SignupFormControl extends FormControl {
    modelProperty: string;
    label: string;

    constructor(label: string, modelProperty: string, value: any, validator: any) {
        super(value, validator);
        this.modelProperty = modelProperty;
        this.label = label;
    }

    getValidationMessages() {
        const messages: string[] = [];
        if (this.errors) {
            for (const errorName in this.errors) {
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
            organization: new SignupFormControl('Organization Name', 'organization', '', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(30)])),
            fname: new SignupFormControl('Name','fname','', Validators.compose([Validators.required,   Validators.maxLength(10), Validators.pattern('[a-zA-Z]+')])),
             lname: new SignupFormControl('Name','lname','', Validators.compose([Validators.required,  Validators.maxLength(10), Validators.pattern('[a-zA-Z]+')])),
             email: new SignupFormControl('Email', 'email', '', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
             password:new SignupFormControl('Password','password','', 
             Validators.compose([Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')])),
             confirmPassword:new SignupFormControl('Confirm Password','confirmPassword','', Validators.compose([Validators.required])),
             mobile: new SignupFormControl('Name','mobile','', Validators.compose([Validators.required])),
        })
    }

    get parentalControls(): SignupFormControl[] {

        return Object.keys(this.controls).map((k) => this.controls[k] as SignupFormControl);
    }

    getFormValidationMessages(): string[] {
        const messages: string[] = [];
        this.parentalControls.forEach(c => c.getValidationMessages().forEach(m => messages.push(m)));
        return messages;
    }


}


// import { AbstractControl } from '@angular/forms';
// export class PasswordValidation {

//     static MatchPassword(AC: AbstractControl) {
//         const password = AC.get('password').value;
//         if(AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
//             const verifyPassword = AC.get('confirmPassword').value;

//             if(password != verifyPassword) {
//                 AC.get('confirmPassword').setErrors( {MatchPassword: true} )
//             } else {
//                 return null
//             }
//         }
//     }
// }