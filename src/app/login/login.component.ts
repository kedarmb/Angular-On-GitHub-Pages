import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
//import { LoginFormControl } from './login.validator';
import { LoginFormGroup } from './login.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: LoginFormGroup = new LoginFormGroup();
  formSubmitted: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  submit(form) {
    console.log(form);
    this.formSubmitted = true;
    if (form.valid) {
      console.log('**********************Form is valid');
      form.reset();
      this.formSubmitted = false;
      this.router.navigateByUrl('/dashboard');
    } else {
      console.log('***************************From is invalid');
    }

  }
}
