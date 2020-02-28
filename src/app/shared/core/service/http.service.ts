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

  public createLabour(body): Observable<any> {
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
  //
  public getAllLabourEquipment(): Observable<any> {
    // return this.httpClient.get('assets/labourequipmentdata.json', { headers: this.getHeader(), observe: 'response' });
    return this.httpClient.get(ApiUrl.labourEquipment + '/0/0', { headers: this.getHeader(), observe: 'response' });
  }
  public saveLabourEquipment(data): Observable<any> {
    return this.httpClient.post(ApiUrl.labourEquipment, data, { headers: this.getHeader(), observe: 'response' });
  }
  public updateLabourEquipment(data, id): Observable<any> {
    return this.httpClient.put(ApiUrl.labourEquipment + '/' + id, data, { headers: this.getHeader(), observe: 'response' });
  }
  //
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
  public getTenders(appendStr): Observable<any> {
    return this.httpClient.get(ApiUrl.tenderUrl + appendStr, { headers: this.getHeader(), observe: 'response' });
  }

  /** Public method to Fetch single record of Tender */
  public getTenderDetailById(id): Observable<any> {
    return this.httpClient.get(ApiUrl.tenderUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public fetchSingleTenderById(id): Observable<any> {
    console.log(ApiUrl.tendersUrl);
    return this.httpClient.get(ApiUrl.tendersUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
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
    return this.httpClient.get(ApiUrl.lineItemUrl + '/' + id, { headers: this.getHeader(), observe: 'response' })
  }
  public saveLineItem(appendStr, payload): Observable<any> {
    return this.httpClient.post(ApiUrl.lineItemUrl + appendStr, payload, { headers: this.getHeader(), observe: 'response' });
  }
  public updateLineItem(appendStr, payload): Observable<any> {
    // /:id/tender/:tenderId/section/:sectionId
    return this.httpClient.put(ApiUrl.lineItemUrl + appendStr, payload, { headers: this.getHeader(), observe: 'response' });
  }

  public saveSubLineItem(appendStr, payload): Observable<any> {
    return this.httpClient.post(ApiUrl.sublineItemUrl + appendStr, payload, { headers: this.getHeader(), observe: 'response' });
  }
  public updateSubLineItem(appendStr, payload): Observable<any> {
    return this.httpClient.put(ApiUrl.sublineItemUrl + appendStr, payload, { headers: this.getHeader(), observe: 'response' });
  }
public updateSelectedSubForLineItem(tenderId,payload):Observable<any>{
  return this.httpClient.put(ApiUrl.lineItemUrl +`/updateSelectedSub/tender/${tenderId}`, payload, { headers: this.getHeader(), observe: 'response' });

  // https://smartbid-api.herokuapp.com/v1/line-item/updateSelectedSub/tender/5e525c20c32be7001ee29b54
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


  saveCrewForLineItem(appendStr, body) {
    // console.log(ApiUrl.lineItemUrl + '/' + appendStr);
    return this.httpClient.post(ApiUrl.lineItemUrl + '/' + appendStr, body, { headers: this.getHeader(), observe: 'response' });
  }

  public createTrenchCalculation(body) {
    return this.httpClient.post(ApiUrl.sectionUrl, body, { headers: this.getHeader(), observe: 'response' });
  }
  /*Trench Calculation TrenchUrl */
  public deleteTrenchUrl(id: string): Observable<any> {
    return this.httpClient.delete(ApiUrl.trenchUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public createTrenchUrl(body): Observable<any> {
    return this.httpClient.post(ApiUrl.trenchUrl + '/', body, { headers: this.getHeader(), observe: 'response' });
  }
  public updateTrench(body, id): Observable<any> {
    return this.httpClient.put(ApiUrl.trenchUrl + '/' + id, body, { headers: this.getHeader(), observe: 'response' });
  }
  public getAllTrenches(): Observable<any> {
    return this.httpClient.get(ApiUrl.trenchUrl, { headers: this.getHeader(), observe: 'response' });
  }
  public getTenderTrenchs(appendStr): Observable<any> {
    return this.httpClient.get(ApiUrl.trenchUrl + appendStr, { headers: this.getHeader(), observe: 'response' });
  }
  public getAllTrenchesForOrg(): Observable<any> {
    return this.httpClient.get(ApiUrl.trenchForOrg, { headers: this.getHeader(), observe: 'response' });
  }

  public saveTrenchForLineItem(appendStr, body): Observable<any> {
    return this.httpClient.post(ApiUrl.trenchUrl + appendStr, body, { headers: this.getHeader(), observe: 'response' });
  }

  public getByIdTrenchUrl(id) {
    return this.httpClient.get(ApiUrl.trenchUrl + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  //
  public getNotifiedSubs(tenderID) {
    // TODO: to fix the following line
    const URL = ApiUrl.notifiedSubsUrl + tenderID + '/headerlevelNotifySub/tender';
    return this.httpClient.get(URL, { headers: this.getHeader(), observe: 'response' });
  }
  /* Invite sub contractor */
  public inviteSubContractor(body) {
    return this.httpClient.post(ApiUrl.inviteSubUrl + '/', body, { headers: this.getHeader(), observe: 'response' });
  }
  public createSubline(body, id) {
    return this.httpClient.post(ApiUrl.createSubline + id, body, { headers: this.getHeader(), observe: 'response' });
  }
  public getSubline(id) {
    return this.httpClient.get(ApiUrl.createSubline + id, { headers: this.getHeader(), observe: 'response' });
  }
  public updateSubline(body, id) {
    return this.httpClient.put(ApiUrl.createSubline + id, body, { headers: this.getHeader(), observe: 'response' });
  }
  public postSubline(body, id) {
    return this.httpClient.put(ApiUrl.createSubline + id + '/sublinePrice', body, { headers: this.getHeader(), observe: 'response' });
  }
  public getUniqueSubline(id) {
    return this.httpClient.get(ApiUrl.createUniqueSubline + '/' + id, { headers: this.getHeader(), observe: 'response' });
  }
  public getselectedsubline(id) {
    return this.httpClient.get(ApiUrl.selectedsublineUrl + id, { headers: this.getHeader(), observe: 'response' });
  }
  public getseletedSubForLine(id, body) {
    return this.httpClient.put(ApiUrl.seletedSubForLineUrl + id, body, { headers: this.getHeader(), observe: 'response' });
  }
  public pdfParser(body) {
    return this.httpClient.post(ApiUrl.pdfParserUrl + '/', body, { headers: this.getHeader(), observe: 'response' });
  }
  public saveSectionWithLineItem(tenderId, body) {
    return this.httpClient.post(ApiUrl.lineItemUrl + '/tender/' + tenderId + '/lineItem', body, { headers: this.getHeader(), observe: 'response' });
  }
}
