import { Injectable } from '@angular/core';
import Organization from '../model/organization.model';
import {Observable, of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  array: Organization[] = [
      {
          id: '100',
    name: 'ROYAL CASTOR PRODUCTS LIMITED',
    streetAddress: '101, Ketan Apartments 233, R. B. Mehta Marg, Ghatkopar (East)',
    serviceType: 'compress',
    serviceArea: 'compress',
    province: 'us-east',
    country: 'india',
    type: 1,
    city: 'DELHI'
}, {
          id: '101',
          name: 'GREEN LUBRICANT CO., LTD',
          streetAddress: 'SM413, S14, Dong-A Univ., 37 Nakdong-Daero 550beon-gil, Saha-gu Busan 49315',
          serviceType: 'compress',
          serviceArea: 'compress',
          province: 'us-east',
          country: 'india',
          type: 1,
          city: 'DELHI'
      }, {
          id: '100',
          name: 'DONGSUH INDUSTRY CO.,LTD',
          streetAddress: '122, Byeongnyu-gil, Geumcheon-myeon, Naju-si',
          serviceType: 'compress',
          serviceArea: 'compress',
          province: 'us-east',
          country: 'South Korea',
          type: 1,
          city: 'Jeollanam'
      }];
  constructor() { }
  public addData(organization: Organization): Observable<Organization> {
    this.array.push(organization);
    return of(organization);

  }
  public DeleteData(id): Observable<Organization[]> {

    const array = this.array.filter((organization) => {
        if (organization.id === id) {
            return false;
        }  else {
            return true;
        }
     })
      return of(array);
  }

  public getOrganizations() {
      return of(this.array);
  }

}
