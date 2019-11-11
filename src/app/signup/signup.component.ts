import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidator } from './password.validator';
import { from } from 'rxjs';

import{SignupService} from '../service/signup.service'
import Signup from 'app/model/signup.model';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signup: Signup =new Signup();
data:any;
  constructor(private fb : FormBuilder, private serv:SignupService ,private router:Router) { }
  registrationForm=this.fb.group({
    orgName:['', [Validators.required]],
    name:['', [Validators.required]],
    email:['', [Validators.required]],
    password:['',[Validators.required]],
    confirmPassword:['',[Validators.required]]
  }, {validator:PasswordValidator});
  ngOnInit() {
  
  }


submit(registrationForm){
  for(let i in registrationForm.controls){
    this.signup[i]=registrationForm.controls[i].value;
  }
  
  console.log(this.signup)

  this.serv.signup(this.signup).subscribe(data=>{

    this.data=data
    console.log(data);
    this.router.navigateByUrl('/login')
  })
}

}