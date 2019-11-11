import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupFormGroup } from './signup.validator';
import {SignupFormControl} from './signup.validator';
import {TooltipPosition} from '@angular/material/tooltip';
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
  registrationForm:SignupFormGroup=new SignupFormGroup();
  formSubmitted: boolean = false;
  data:any;
  positionOptions: TooltipPosition[] = ['below'];
  position = new FormControl(this.positionOptions[0]);
signup:Signup=new Signup();
  constructor(private fb : FormBuilder, private serv: SignupService, private route:Router) { }
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
    this.route.navigateByUrl('/login')
  })
}

}