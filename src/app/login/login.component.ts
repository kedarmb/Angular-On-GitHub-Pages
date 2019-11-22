import { regex } from './../constant/index';
import { HelperService } from './../service/helper.service';
import { UserServiceService } from './../service/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { LoginFormControl } from './login.validator';
// import { LoginFormGroup } from './login.validator';
import { Router } from '@angular/router';
import Login from 'app/model/login.model';
import { LoginService } from '../service/login.service';
import {errorMsg, regex} from '../constant/index'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formSubmitted: boolean = false;
  loginObj: Login = new Login();
  constructor(private router: Router,
    private formBuider: FormBuilder,
    private loginService: LoginService, 
    private helperService: HelperService){ 
    }
    
    ngOnInit() {
      // console.log(this.emailRegex)
    this.form = this.formBuider.group({
      email: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.emailReg , msg:errorMsg.email})]],
      password: ['', Validators.required]
    })
  }

  submit(form) {
    console.log(this.form);
    // this.loginService.login(this.form).subscribe((response: any) => {
    //   if (response.status === 200) {
    //     console.log(response);
    //     this.router.navigateByUrl('/dashboard');
    //   }
    // }, error => {
    //   console.log(error);
    // });
  }
}
