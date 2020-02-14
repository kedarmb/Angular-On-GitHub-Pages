import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SignupFormGroup } from './signup.validator';
import { TooltipPosition } from '@angular/material/tooltip';
import Signup from 'app/shared/core/model/signup.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/shared/core/service/http.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registrationForm: SignupFormGroup = new SignupFormGroup();
  formSubmitted = false;
  data: any;
  positionOptions: TooltipPosition[] = ['below'];
  position = new FormControl(this.positionOptions[0]);
  signup: Signup = new Signup();
  constructor(private fb: FormBuilder, private httpService: HttpService, private route: Router) { }
  ngOnInit() {
    
  }
  submit(registrationForm) {
      for (let i in registrationForm.controls) {
      this.signup[i] = registrationForm.controls[i].value;
    }
    this.httpService.signup(this.signup).subscribe(data => {
      this.data = data
      console.log(data);
      this.route.navigateByUrl('/login')
    })
  }
}




