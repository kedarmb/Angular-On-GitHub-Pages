import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginFormControl} from './login.validator';
import {LoginFormGroup} from './login.validator';
import {Router} from '@angular/router';
import Login from 'app/model/login.model';
import {LoginService} from '../service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:LoginFormGroup=new LoginFormGroup();
  formSubmitted: boolean = false;
  loginObj:Login= new Login();
  constructor(private router:Router , private loginService: LoginService) { }

  ngOnInit() {
  }

   submit(form){
     this.formSubmitted = true;
     if (form.valid) {
      console.log(form.controls.username.value);
      console.log(form.controls.password.value);
      this.loginObj.username = form.controls.username.value;
      this.loginObj.password = form.controls.password.value;
      //

      this.loginService.login(this.loginObj).subscribe(data=>
        {
          this.formSubmitted = false;
          // this.router.navigateByUrl('/dashboard');
        })
      
      
     }else{
       console.log('***************************Form is invalid');
     }

   }
}
