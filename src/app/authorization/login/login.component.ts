import { HelperService } from '../../shared/core/service/helper.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { LoginFormControl } from './login.validator';
// import { LoginFormGroup } from './login.validator';
import { Router } from '@angular/router';
import Login from 'app/shared/core/model/login.model';
import { HttpService } from '../../shared/core/service/http.service';
import { Observable, forkJoin } from 'rxjs';
import { errorMsg, regex } from '../../shared/core/constant/index';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private httpService: HttpService,
    private helperService: HelperService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuider.group({
      email: ['', [Validators.required, this.helperService.customPatternValid({ pattern: regex.emailReg, msg: errorMsg.email })]],
      password: ['', Validators.required]
    })
  }

  submit() {
    this.spinner.show();
    console.log(this.loginForm.value);
    this.httpService.login(this.loginForm.value)
      .subscribe((response: any) => {
        console.log('result of login response: ', response);
        if (response.status === 200) {
          // this.router.navigateByUrl('/dashboard');
          this.loadInitData();
        }
      }, error => {
        this.spinner.hide();
        console.log('result of login response: ', error);
        this.toastr.error(error.error.message)
        console.log(error);
      });
  }

  loadInitData() {
    const orgData = this.httpService.getAllOrganization();
    // console.log('org data is ', orgData);
    const equipData = this.httpService.getAllEquipment();
    const labourData = this.httpService.getAllLabour();
    //
    forkJoin([orgData, equipData, labourData]).subscribe(results => {
      // console.log(results[0].body);
      localStorage.setItem('orgList', JSON.stringify(results[0].body));
      localStorage.setItem('equipList', JSON.stringify(results[1].body));
      localStorage.setItem('labourList', JSON.stringify(results[2].body));
      //
      this.spinner.hide();
      this.router.navigateByUrl('/dashboard');
    })
  }
}
