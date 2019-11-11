import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupFormGroup } from './signup.validator';
// import { PasswordValidator } from './password.validator';
import {SignupFormControl} from './signup.validator';
// import {signupFormGroup} from './signup.validator';
import {TooltipPosition} from '@angular/material/tooltip';
import { from } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registrationForm:SignupFormGroup=new SignupFormGroup();
  formSubmitted: boolean = false;
  positionOptions: TooltipPosition[] = ['below'];
  position = new FormControl(this.positionOptions[0]);

  constructor(private fb : FormBuilder) { }
  // registrationForm=this.fb.group({
  //   // orgName:['', [Validators.required]],
  //   name:['', [Validators.required]],
  //   email:['', [Validators.required]],
  //   password:['',[Validators.required]],
  //   confirmPassword:['',[Validators.required]]
  // }, {validator:PasswordValidator});
  ngOnInit() {
  }

}
