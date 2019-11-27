import { Injectable } from '@angular/core';
import Organization from '../model/organization.model';
import {Observable, of, from} from 'rxjs';
import * as uuid from 'uuid';
import {HttpClient} from '@angular/common/http';
import * as Constant from '../constant';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService  {

  constructor(private httpClient: HttpClient) { }
  
  public create(body) {
    return this.httpClient.post(Constant.API_URL + '/organization', body, {observe: 'response'});
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
