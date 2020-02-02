import { Engineer } from './../model/crew.model';
import { Injectable } from '@angular/core';
import { ValidatorFn, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, ApiUrl } from '../constant/index';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
  // labourData: any;
  equipmentData = new BehaviorSubject<any>('');
  labourData = new BehaviorSubject<any>('');
  // cal_eve = new BehaviorSubject<any>('');
  equipmentStore: any;
  labourStore: any
  //
  orgList: any[] = [];
  tender_even = [{}]

  allEquipList: any[] = [];
  allLabourList: any[] = [];
  //
  filteredOrgList: any[] = [];
  usersOrg: string;

  private allowFreeTextAddEngineer = false;
  public chipSelectedEngineers: Engineer[] = [];
  equipments: any;
  constructor(private httpService: HttpService, private httpClient: HttpClient,
    private spinner: NgxSpinnerService) {

  }

  setOrgId() {
    // just update the Organization ID for the logged in user
    const uData = JSON.parse(sessionStorage.getItem('userData'));
    this.usersOrg = uData['organization'];
  }
  getOrgId() {
    return this.usersOrg;
  }

  getTenterEven(tender_even){
    this.tender_even = tender_even
  }

  setTenderEven(){
    return this.tender_even
  }

  setOrgList() {
    // console.log('set ------ org ---- list');
    const orgData = JSON.parse(localStorage.getItem('orgList'));
    const _orgList = (orgData as Array<any>).filter((item) => {
      return item['orgType'][0] === 'Client';
    });
    this.orgList = _orgList;
  }
  setEqupmentList() {
    this.allEquipList = JSON.parse(localStorage.getItem('equipList'));
  }
  setLabourList() {
    this.allLabourList = JSON.parse(localStorage.getItem('labourList'));
  }

  getFromLocalStorage(param) {
    return localStorage.getItem(param);
  }

  setInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getHeader() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Accept', 'application/json; charset=utf-8');
  }
  labourDataForChip(data) {
    this.labourStore = data.map((ev) => {
      return Object.assign({ _id: ev._id, name: ev.name })
    })
    this.labourData.next(this.labourStore);
  
    console.log(this.labourStore)
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
  //
  public findClientID(name: string) {
    const client = this.orgList.find(item => item.name === name)
    // console.log(name + ' ......' + client);
    return client._id;
  }
  public findClientName(id) {
    // console.log(this.orgList, id)
    const client = this.orgList.find(item => item._id === id)
    // console.log(client);
    if (client !== undefined) {
      // console.log('corresponding client is .. ', client);
    }
    // console.log(client);
    // console.log('------------------------')
    if (client !== undefined) {
      return client.name;
    } else if (client === undefined) {
      return 'N. Available'
    }

  }

  findLabourObj(id) {
    const labour = this.allLabourList.find(item => item._id === id);
    // console.log(id, '    labor obj    ', this.allLabourList);
    if (labour !== undefined) {
      return labour;
    } else if (labour === undefined) {
      // return 'N. Available'
    }
  }
  findEqipObj(id) {
    const equip = this.allEquipList.find(item => item._id === id);
    // console.log(id, '    labor obj    ', this.allEquipList);
    if (equip !== undefined) {
      return equip;
    } else if (equip === undefined) {
      // return 'N. Available'
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

  private filterEngineer(engineerList: Engineer[], engineerName: String): String[] {
    let filteredEngineerList: Engineer[] = [];
    const filterValue = engineerName.toLowerCase();
    const engineersMatchingEngineerName = engineerList.filter(engineer => engineer.name.toLowerCase().indexOf(filterValue) === 0);
    if (engineersMatchingEngineerName.length || this.allowFreeTextAddEngineer) {
      //
      // either the engineer name matched some autocomplete options
      // or the name didn't match but we're allowing
      // non-autocomplete engineer names to be entered
      //
      filteredEngineerList = engineersMatchingEngineerName;
    } else {
      //
      // the engineer name didn't match the autocomplete list
      // and we're only allowing engineers to be selected from the list
      // so we show the whjole list
      //
      filteredEngineerList = engineerList;
    }
    //
    // Convert filtered list of engineer objects to list of engineer
    // name strings and return it
    //
    return filteredEngineerList.map(engineer => engineer.name);
  }
  //////////////////////////////////////////////////////////////////////////////

  public filterOnValueChange(engineerName: string | null, data, selectedChip): String[] {
    let result: String[] = [];
    // console.log(data)
    // console.log(selectedChip);
    //
    // Remove the engineers we have already selected from all engineers to
    // get a starting point for the autocomplete list.
    //
    const allEngineersLessSelected = data.filter(engineer => selectedChip.indexOf(engineer) < 0);
    // console.log(allEngineersLessSelected)
    console.log(engineerName)
    if (engineerName) {
      result = this.filterEngineer(allEngineersLessSelected, engineerName);
    } else {
      result = allEngineersLessSelected.map(engineer => engineer.name);
    }
    return result;
  }
  //
  /* getEquipmentData() {
    this.httpService.getAllEquipment()
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.equipments = response.body
          console.log(response.body);
          this.equipmentData.next(this.equipmentStore);
        }
      },
        error => {
          console.log(error);
        }
      )
  }; */
}
