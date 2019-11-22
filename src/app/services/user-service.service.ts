import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

 import { Observable } from 'rxjs';
import { User } from 'app/user.model';
import { ValidatorFn, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  // public employee=[];
  constructor(private _http:HttpClient) { }
  // getemployee(){
  //   returnd
  //   [{"id":1, "name":"alish","age":30}
  // ]
  // };
  getusers(): Observable<any> {
   return this._http.get('https://jsonplaceholder.typicode.com/posts') ;
  }
}

