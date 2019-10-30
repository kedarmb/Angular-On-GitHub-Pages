import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidator } from './password.validator';
import { from } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb : FormBuilder) { }
  registrationForm=this.fb.group({
    orgName:['', [Validators.required]],
    name:['', [Validators.required]],
    email:['', [Validators.required]],
    password:['',[Validators.required]],
    confirmPassword:['',[Validators.required]]
  }, {validator:PasswordValidator});
  ngOnInit() {
  }

}
