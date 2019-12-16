import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, ApiUrl } from '../constant/index';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  getHeader() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Accept', 'application/json; charset=utf-8');
  }
  constructor(private httpClient: HttpClient) {

   }
  // Example api
  //
  // getLabourById(data): Observable<any> {
  //   return this.httpClient.put(ApiUrl.LabourUrl +'/' + data._id , data, {headers: this.getHeader(), observe: 'response' });
  // }
  //

  public createEquipment(body) {
    return this.httpClient.post(ApiUrl.equipmentUrl, body, { headers: this.getHeader(), observe: 'response' });
  }

  public updateEquipment(id, body) {

    return this.httpClient.put(ApiUrl.equipmentUrl + '/' + id, body, { headers: this.getHeader(), observe: 'response' });
  }

  public deleteEquipment(id) {

    return this.httpClient.delete(ApiUrl.equipmentUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public getAllEquipment() {
    return this.httpClient.get(ApiUrl.equipmentUrl, { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdEquipment(id) {
    return this.httpClient.get(ApiUrl.equipmentUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public createLabour(body) {
    return this.httpClient.post(ApiUrl.LabourUrl, body, { headers: this.getHeader(), observe: 'response' });
  }

  public updateLabour(id, body) {

    return this.httpClient.put(ApiUrl.LabourUrl + '/' + id, body, { headers: this.getHeader(), observe: 'response' });
  }

  public deleteLabour(id) {

    return this.httpClient.delete(ApiUrl.LabourUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public getAllLabour() {
    return this.httpClient.get(ApiUrl.LabourUrl + '/', { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdLabour(id) {
    return this.httpClient.get(ApiUrl.LabourUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public login(data) {
    return this.httpClient.post(API_URL + '/login', data, { headers: this.getHeader(), observe: 'response' });
  }

  public createOrganization(body) {
    return this.httpClient.post(ApiUrl.orgUrl, body, { headers: this.getHeader(), observe: 'response' });
  }

  public updateOrganization(data) {
    return this.httpClient.put(ApiUrl.orgUrl + '/' + data.id, data, { headers: this.getHeader(), observe: 'response' });
  }

  public deleteOrganization(data) {
    return this.httpClient.delete(ApiUrl.orgUrl + '/' + data.id, { headers: this.getHeader(), observe: 'response' });
  }

  public getAllOrganization() {
    return this.httpClient.get(ApiUrl.orgUrl, { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdOrganization(id) {
    return this.httpClient.get(ApiUrl.orgUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public signup(body) {
    console.log(body);
    return this.httpClient.post(API_URL + '/signup', body, { headers: this.getHeader(), observe: 'response' });
  }

  getTendersItems() {
    return this.httpClient.get(`https://5d98bdd161c84c00147d7173.mockapi.io/tenderitems`);
  }

  public delUser(id: string) {
    return this.httpClient.delete(ApiUrl.UserUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public createUser(body) {
    return this.httpClient.post(API_URL + '/user/', body, { headers: this.getHeader(), observe: 'response' } );
  }
  public updateUser(body) {
    return this.httpClient.put(ApiUrl.UserUrl + '/' + body.id, body, { headers: this.getHeader(), observe: 'response' });
  }
  public getAllUser() {
    return this.httpClient.get(ApiUrl.UserUrl , { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdUser(id) {
    return this.httpClient.get(ApiUrl.UserUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
}
