import { Injectable } from '@angular/core';
import Organization from '../model/organization.model';
import {Observable, of} from 'rxjs';
import * as uuid from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  array: Organization[] = [
      {
          id: '8f212c86-124f-424e-945b-397f78c3571d',
    name: 'ROYAL CASTOR PRODUCTS LIMITED',
    streetAddress: '101, Ketan Apartments 233, R. B. Mehta Marg, Ghatkopar (East)',
    serviceType: 'compress',
    serviceArea: 'compress',
    province: 'us-east',
    country: 'india',
    type: 1,
    city: 'DELHI'
}, {
          id: '8f212c86-124f-424e-945b-397f78c3571e',
          name: 'GREEN LUBRICANT CO., LTD',
          streetAddress: 'SM413, S14, Dong-A Univ., 37 Nakdong-Daero 550beon-gil, Saha-gu Busan 49315',
          serviceType: 'compress',
          serviceArea: 'compress',
          province: 'us-east',
          country: 'india',
          type: 1,
          city: 'DELHI'
      }, {
          id: '8f212c86-124f-424e-945b-397f78c3571a',
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

  public add(organization: Organization) {
      const myId = uuid.v4();
      organization.id = myId;
    this.array.unshift(organization);
    return of([]);

  }

  public update(item) {

      this.array = this.array.map((organization) => {
          if (organization.id === item.id) {
              return item;
          } else {
              return organization;
          }
      })

      return of([]);
  }

  public delete(item) {

    this.array = this.array.filter((organization) => {
        if (organization.id === item.id) {

            return false;
        }  else {
            return true;
        }
     })
      return of([]);
  }

  public getAll() {
      return of(this.array);
  }

}
