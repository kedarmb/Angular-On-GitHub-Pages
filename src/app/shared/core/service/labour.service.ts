import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import * as uuid from 'uuid';
import {HttpClient} from '@angular/common/http';
import * as Constant from '../constant';
@Injectable({
  providedIn: 'root'
})
export class LabourService {

  constructor(private httpClient: HttpClient) { }

  public create(body) {
      return this.httpClient.post(Constant.API_URL + '/labour', body);
  }

  public update(id, body) {

   return this.httpClient.put(Constant.API_URL + '/labour/' + id, body);
  }

  public delete(id) {

     return this.httpClient.delete(Constant.API_URL + '/labour/' + id);
  }

  public getAll() {
    return this.httpClient.get(Constant.API_URL + '/labour');
  }

  public getById(id) {
      return this.httpClient.get(Constant.API_URL + '/labour/' + id);
  }

}

