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
  constructor(private httpClient: HttpClient) { }

  public createEquipment(body): Observable<any> {
    return this.httpClient.post(ApiUrl.equipmentUrl, body, { headers: this.getHeader(), observe: 'response' });
  }

  public updateEquipment(data, id): Observable<any> {

    return this.httpClient.put(ApiUrl.equipmentUrl + '/' + id, data, { headers: this.getHeader(), observe: 'response' });
  }

  public deleteEquipment(id): Observable<any> {

    return this.httpClient.delete(ApiUrl.equipmentUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public getAllEquipment(): Observable<any> {
    return this.httpClient.get(ApiUrl.equipmentUrl, { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdEquipment(id): Observable<any> {
    return this.httpClient.get(ApiUrl.equipmentUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public  createLabour(body): Observable<any> {
    return this.httpClient.post(ApiUrl.LabourUrl, body, { headers: this.getHeader(), observe: 'response' });
  }

  public updateLabour(data, id): Observable<any> {

    return this.httpClient.put(ApiUrl.LabourUrl + '/' + id, data, { headers: this.getHeader(), observe: 'response' });
  }

  public deleteLabour(id): Observable<any> {

    return this.httpClient.delete(ApiUrl.LabourUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public getAllLabour(): Observable<any> {
    return this.httpClient.get(ApiUrl.LabourUrl + '/', { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdLabour(id): Observable<any> {
    return this.httpClient.get(ApiUrl.LabourUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public login(data): Observable<any> {
    return this.httpClient.post(ApiUrl.loginUrl + '/', data, { headers: this.getHeader(), observe: 'response' });
  }

  public createOrganization(body): Observable<any> {
    return this.httpClient.post(ApiUrl.orgUrl, body, { headers: this.getHeader(), observe: 'response' });
  }

  public updateOrganization(data, id): Observable<any> {
    return this.httpClient.put(ApiUrl.orgUrl + '/' + id, data, { headers: this.getHeader(), observe: 'response' });
  }

  public deleteOrganization(data): Observable<any> {
    return this.httpClient.delete(ApiUrl.orgUrl + '/' + data, { headers: this.getHeader(), observe: 'response' });
  }

  public getAllOrganization(): Observable<any> {
    return this.httpClient.get(ApiUrl.orgUrl, { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdOrganization(id): Observable<any> {
    return this.httpClient.get(ApiUrl.orgUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public signup(body): Observable<any> {
    console.log(body);
    return this.httpClient.post(ApiUrl.createAcc + '/', body, { headers: this.getHeader(), observe: 'response' });
  }

  public delUser(id: string): Observable<any> {
    return this.httpClient.delete(ApiUrl.UserUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public createUser(body): Observable<any> {
    return this.httpClient.post(ApiUrl.createAcc + '/', body, { headers: this.getHeader(), observe: 'response' });
  }
  public updateUser(body, id): Observable<any> {
    return this.httpClient.put(ApiUrl.UserUrl + '/' + id, body, { headers: this.getHeader(), observe: 'response' });
  }
  public getAllUser(): Observable<any> {
    return this.httpClient.get(ApiUrl.UserUrl, { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdUser(id): Observable<any> {
    return this.httpClient.get(ApiUrl.UserUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  //
  // API call for Tender Header & Tender Line & Subline Items
  public getSections(): Observable<any> {
    return this.httpClient.get(ApiUrl.sectionUrl, { headers: this.getHeader(), observe: 'response' });
  }
  /** Public method to return the list of Tender Headers */
  public getTenders(): Observable<any> {
    return this.httpClient.get(ApiUrl.tenderUrl, { headers: this.getHeader(), observe: 'response' });
  }

  /** Public method to Fetch single record of Tender */
  public getTenderDetailById(id): Observable<any> {
    return this.httpClient.get(ApiUrl.tenderUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public addNewTender(body): Observable<any> {
    return this.httpClient.post(ApiUrl.tenderUrl, body, { headers: this.getHeader(), observe: 'response' });
  }
  public updateTender(id, body): Observable<any> {
    return this.httpClient.put(ApiUrl.tenderUrl + '/' + id, body, { headers: this.getHeader(), observe: 'response' });
  }
  public deleteTenderById(id): Observable<any> {
    return this.httpClient.delete(ApiUrl.tenderUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }

  public getLineItems(id): Observable<any> {
    return this.httpClient.get(ApiUrl.lineItems + '/' + id, { headers: this.getHeader(), observe: 'response' })
  }
  /* TENDER SECTION */

  /* Crew Template */
  public deleteCrewTemplate(id: string): Observable<any> {
    return this.httpClient.delete(ApiUrl.crewTemplateUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public createCrewTemplate(body): Observable<any> {
    return this.httpClient.post(ApiUrl.crewTemplateUrl + '/', body, { headers: this.getHeader(), observe: 'response' });
  }
  public updateCrewTemplate(body, id): Observable<any> {
    return this.httpClient.put(ApiUrl.crewTemplateUrl + '/' + id, body, { headers: this.getHeader(), observe: 'response' });
  }
  public getAllCrews(): Observable<any> {
    return this.httpClient.get(ApiUrl.crewTemplateUrl, { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdCrewTemplate(id) {
    return this.httpClient.get(ApiUrl.crewTemplateUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public createNewSection(body) {
    return this.httpClient.post(ApiUrl.sectionUrl, body, { headers: this.getHeader(), observe: 'response' });
  }
  public createTrenchCalculation(body) {
    return this.httpClient.post(ApiUrl.sectionUrl, body, { headers: this.getHeader(), observe: 'response' });
  }

  
}

