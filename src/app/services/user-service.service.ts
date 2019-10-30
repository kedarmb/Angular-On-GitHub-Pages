import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

 import { Observable } from 'rxjs';
import { User } from 'app/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http:HttpClient) { }
  getusers(): Observable<any>{
   return this._http.get('https://jsonplaceholder.typicode.com/posts') ;
 
  }
}
