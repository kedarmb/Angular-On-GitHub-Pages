
import { Injectable } from '@angular/core';
import { ValidatorFn, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  equipmentData = new BehaviorSubject<any>('');
  labourData = new BehaviorSubject<any>('');
  equipmentStore: any;
  labourStore: any
  private orgList: any[] = [];
  private subContList: any[] = [];
  private tenderList: any[] = [];
  tender_even = [{}]
  private allEquipList: any[] = [];
  private allLabourList: any[] = [];
  filteredOrgList: any[] = [];
  usersOrg: string;
  equipments: any;
  constructor() {
  }

  setOrgId() {
    // just update the Organization ID for the logged in user
    const uData = JSON.parse(sessionStorage.getItem('userData'));
    this.usersOrg = uData['organization'];
  }
  getOrgId() {
    return this.usersOrg;
  }

  getTenterEven(tender_even) {
    this.tender_even = tender_even
  }

  setTenderEven() {
    return this.tender_even
  }

  setOrgList() {
    const orgData = JSON.parse(localStorage.getItem('orgList'));
    const _orgList = (orgData as Array<any>).filter((item) => {
      return item['orgType'][0] === 'Client';
    });
    this.orgList = _orgList;
    this.setSubContractorList();
  }

  addOrgToLocalList(param) {
    const orgData = JSON.parse(localStorage.getItem('orgList'));
    orgData.push(param);
    this.setInLocalStorage('orgList', orgData);
  }

  private setSubContractorList() {
    const orgData = JSON.parse(localStorage.getItem('orgList'));
    const _subList = (orgData as Array<any>).filter((item) => {
      return item['orgType'][0] === 'Sub';
    });
    this.subContList = _subList;
  }

  getSubContractorList() {
    return this.subContList;
  }

  setEqupmentList() {
    this.allEquipList = JSON.parse(localStorage.getItem('equipList'));
  }

  setLabourList() {
    this.allLabourList = JSON.parse(localStorage.getItem('labourList'));
  }

  setTenderList(list) {
    this.tenderList = [];
    this.tenderList = [...list];
  }

  getTenderList() {
    return this.tenderList;
  }

  updateLocalTenderListByID(tData) {
    console.log('tData is >>>>>> ', tData);
    // after modifying tender line/subline/crew/trench the modified saved at local end
    const tID = tData._id;
    for (let i = 0; i < this.tenderList.length; i++) {
      if (this.tenderList[i]._id === tID) {
        this.tenderList.splice(i, 1, tData);
      }
    }
  }

  getFromLocalStorage(param) {
    return localStorage.getItem(param);
  }

  setInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  labourDataForChip(data) {
    this.labourStore = data.map((ev) => {
      return Object.assign({ _id: ev._id, name: ev.name })
    })
    this.labourData.next(this.labourStore);
  }

  customPatternValid(patternParam: any): ValidatorFn {
    return (control: FormControl) => {
      const regexp: RegExp = patternParam.pattern;
      control.value.match()
      if (control.value && !control.value.match(regexp)) {
        return {
          invalidMsg: patternParam.msg
        };
      } else {
        return null;
      }
    };
  }

  public findClientID(name: string) {
    const client = this.orgList.find(item => item.name === name)
    return client._id;
  }

  public findClientName(id) {
    const client = this.orgList.find(item => item._id === id)
    if (client !== undefined) {
    }
    if (client !== undefined) {
      return client.name;
    } else if (client === undefined) {
      return 'N. Available'
    }

  }

  // generic helper function to return chosen key value pair from any given object
  pickChosenProps(o, ...fields) {
    return fields.reduce((a, x) => {
      if (o.hasOwnProperty(x)) {
        a[x] = o[x];
      }
      return a;
    }, {});
  }

  // methods to crud with session Storage
  setSession(k, v) {
    sessionStorage.setItem(k, v);
  }
  getSession(k) {
    return sessionStorage.getItem(k);
  }
  clearSession() {
    sessionStorage.clear();
  }
  removeSession(k) {
    sessionStorage.remove(k);
  }
}
