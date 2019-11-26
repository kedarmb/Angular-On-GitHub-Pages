import { Injectable } from '@angular/core';
import User from '../model/user.model';
import { API_URL } from '../constant/index';
import {Observable, of} from 'rxjs';
import * as uuid from 'uuid';
import {HttpClient} from '@angular/common/http';
import * as Constant from '../constant';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }



public del(id:string) {

 return this.httpClient.delete(Constant.API_URL + '/user/' + id);
}
getAll(): Observable<any>{
  return this.httpClient.get('https://jsonplaceholder.typicode.com/posts') ;

 }

 // Added by Arup: 21-11-2019
 /* add(user: User)Observable<any>{
  const addUserURL = API_URL + '/tender';
  return {}
 } */


}