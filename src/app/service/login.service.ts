


import { Injectable } from '@angular/core';
import Login from '../model/login.model';
import {Observable, of} from 'rxjs';
import * as uuid from 'uuid';
import {HttpClient} from '@angular/common/http';
import * as Constant from './../constant';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public login(body) {
      return this.httpClient.post(Constant.API_URL + '/login', body);
  }

 

}

