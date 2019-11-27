import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as Constant from '../constant';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService  {

  getHeader() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Accept', 'application/json; charset=utf-8');
  } 
  constructor(private httpClient: HttpClient) { }
  
  public create(body) {
    return this.httpClient.post(Constant.API_URL + '/organization', body, { headers: this.getHeader(), observe: 'response'});
      // return this.httpClient.post(Constant.API_URL + '/organization', body);
  }

  public update(id, body) {

   return this.httpClient.put(Constant.API_URL + '/organization/' + id, body);
  }

  public delete(id) {

     return this.httpClient.delete(Constant.API_URL + '/organization/' + id);
  } 

  public getAll() {
    return this.httpClient.get(Constant.API_URL + '/organization');
  }

  public getById(id) {
      return this.httpClient.get(Constant.API_URL + '/organization/' + id);
  }

}
