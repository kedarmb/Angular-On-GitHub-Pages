import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constant/index';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  getHeader() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Accept', 'application/json; charset=utf-8');
  }
  constructor(private httpClient: HttpClient) { }

  public createEquipment(body) {
    return this.httpClient.post(API_URL + '/equipment', body, { headers: this.getHeader(), observe: 'response' });
  }

  public updateEquipment(id, body) {

    return this.httpClient.put(API_URL + '/equipment/' + id, body, { headers: this.getHeader(), observe: 'response' });
  }

  public deleteEquipment(id) {

    return this.httpClient.delete(API_URL + '/equipment/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public getAllEquipment() {
    return this.httpClient.get(API_URL + '/equipment', { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdEquipment(id) {
    return this.httpClient.get(API_URL + '/equipment/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public createLabour(body) {
    return this.httpClient.post(API_URL + '/labour', body, { headers: this.getHeader(), observe: 'response' });
  }

  public updateLabour(id, body) {

    return this.httpClient.put(API_URL + '/labour/' + id, body, { headers: this.getHeader(), observe: 'response' });
  }

  public deleteLabour(id) {

    return this.httpClient.delete(API_URL + '/labour/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public getAllLabour() {
    return this.httpClient.get(API_URL + '/labour', { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdLabour(id) {
    return this.httpClient.get(API_URL + '/labour/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public login(data) {
    return this.httpClient.post(API_URL + '/login', data, { headers: this.getHeader(), observe: 'response' });
  }

  public createOrganization(body) {
    return this.httpClient.post(API_URL + '/organization', body, { headers: this.getHeader(), observe: 'response' });
    // return this.httpClient.post(API_URL + '/organization', body);
  }

  public updateOrganization(id, body) {

    return this.httpClient.put(API_URL + '/organization/' + id, body, { headers: this.getHeader(), observe: 'response' });
  }

  public deleteOrganization(id) {

    return this.httpClient.delete(API_URL + '/organization/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public getAllOrganization() {
    return this.httpClient.get(API_URL + '/organization', { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdOrganization(id) {
    return this.httpClient.get(API_URL + '/organization/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public signup(body) {
    console.log(body);
    return this.httpClient.post(API_URL + '/signup', body, { headers: this.getHeader(), observe: 'response' });
  }

  getTendersItems() {
    return this.httpClient.get(`https://5d98bdd161c84c00147d7173.mockapi.io/tenderitems`);
  }

  public delUser(id: string) {
    return this.httpClient.delete(API_URL + '/user/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public createUser(body) {
    return this.httpClient.post(API_URL + '/user/', body, { headers: this.getHeader(), observe: 'response' } );
  }
  public updateUser(body) {
    return this.httpClient.put(API_URL + '/user/' + body.id, body, { headers: this.getHeader(), observe: 'response' });
  }
  public getAllUser() {
    return this.httpClient.get(API_URL + '/user', { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdUser(id) {
    return this.httpClient.get(API_URL + '/user/' + id, { headers: this.getHeader(), observe: 'response' });
  }
}
