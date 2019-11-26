
import { HelperService } from '../../shared/core/service/helper.service';
import { UserServiceService } from '../../shared/core/service/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { LoginFormControl } from './login.validator';
// import { LoginFormGroup } from './login.validator';
import { Router } from '@angular/router';
import Login from 'app/shared/core/model/login.model';
import { LoginService } from '../../shared/core/service/login.service';
import { errorMsg, regex } from '../../shared/core/constant/index';
//
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formSubmitted = false;
  loginObj: Login = new Login();
  constructor(private router: Router,
    private formBuider: FormBuilder,
    private loginService: LoginService,
    private helperService: HelperService) {
  }

  ngOnInit() {
    // console.log(this.emailRegex)
    this.loginForm = this.formBuider.group({
      email: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.emailReg, msg: errorMsg.email })]],
      password: ['', Validators.required]
    })
  }

  submit() {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value)
      .subscribe((response: any) => {
        console.log(response);
        if (response.status === 200) {
          this.router.navigateByUrl('/dashboard');
        }
      }, error => {
        console.log(error);
      });
  }
}
