### Foreward
> For  simpler form validation, we will not be using any separate validator.ts file, instead will create the Form group using `formBuider.group()` method in the corresponding `component.ts` file itself. This process will help to minimise code development time & enhance readability to a great extent.

> Also, for better code management and future scalability, we are keeping all the RegEx patterns for validators inside the `.. src\app\constant\index.ts` file

> The following example is based on creation of Login Form in `src\app\login\login.component` 

### Step 1:
> Import the following into the `component.ts` file 
```javaScript
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { errorMsg, regex } from './../constant/index';
```
### Step 2:
> Define a class variable `loginForm` & cast its type to  `FormGroup` 
```javaScript
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
```
### Step 3:
> Inside `ngOnInit` lifecycle hook define the `formBuilder` and store its value in the `loginForm` class variable
```javaScript
 ngOnInit() {
    // console.log(this.emailRegex)
    this.loginForm = this.formBuider.group({
      email: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.emailReg, msg: errorMsg.email })]],
      password: ['', Validators.required]
    })
  }
```
> We have a `helperService` in place and just calling the `customPatternValid` method with 2 parameters. 

>1st parameter is the respective RegEx we have stored in `.. src\app\constant\index.ts` file inside exported `regex` constant

>2nd parameter is the corresponding message we wish to display if the RegEx is not matched. Notice that we also have an exported `errorMsg` constant inside the `src\app\constant\index.ts` file.

>That's it !!!

### Step 4:
> Let's now make up our template HTML as follows 
```html
<div class="card-body">
   <form [formGroup]="loginForm" novalidate (ngSubmit)="submit()">
   <div class="row">
      <div class="col-md-12">
         <mat-form-field class="example-full-width">
            <input formControlName="email" matInput placeholder="email" type="text">
         </mat-form-field>
         <div *ngIf="!loginForm.controls.email.valid && (loginForm.controls.email.dirty ||        loginForm.controls.email.touched)" class="error">
            <div *ngIf="loginForm.controls.email.errors.invalidMsg">
               {{loginForm.controls.email.errors.invalidMsg}}
            </div>
         </div>
      </div>
   </div>
   <div class="row">
      <div class="col-md-12">
         <mat-form-field class="example-full-width">
            <input matInput formControlName="password" type="password"
               placeholder="password">
         </mat-form-field>
         <div *ngIf="!loginForm.controls.password.valid && (loginForm.controls.password.dirty || loginForm.controls.password.touched)" class="error">
         </div>
      </div>
   </div>
   <mat-form-field>
      <mat-label>Role</mat-label>
      <select matNativeControl required>
      </select>
   </mat-form-field>
   <div class="row">
      <div class="col">
         Don't have account ? <a routerLink="/signup">SignUp</a>
      </div>
   </div>
   <button mat-raised-button type="submit" 
      [disabled]="loginForm.invalid"
      class="btn btn-danger pull-right">login
   </button>
   <div class="clearfix"></div>
   </form>
</div>

```
> In the HTML too we are writing less code and this making the HTML more readable.