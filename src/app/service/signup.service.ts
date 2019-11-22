import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Constant from './../constant';
import Signup from '../model/signup.model';
import {Observable, of} from 'rxjs';
import * as uuid from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }
  public signup(body) {
    console.log(body);
    return this.httpClient.post(Constant.API_URL + '/signup', body);
}

}
