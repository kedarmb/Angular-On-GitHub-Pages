import { Injectable } from "@angular/core";
import { ValidatorFn, FormControl } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HelperService {
  equipmentData = new BehaviorSubject<any>("");
  labourData = new BehaviorSubject<any>("");
  equipmentStore: any;
  labourStore: any;
  public reducer = (accumulator, currentValue) => accumulator + currentValue;
  //
  private tenderList: any[] = [];
  tender_even = [{}];
  //
  filteredOrgList: any[] = [];
  equipments: any;
  //
  constructor() {}

  /**Returns list of all Organizations from Local Storage */
  getOrgList() {
    const _orgList = JSON.parse(localStorage.getItem("orgList"));
    return _orgList;
  }
  /** Returns Organization ID from Local Storage */
  getOrgId() {
    const uData = JSON.parse(sessionStorage.getItem("userData"));
    const _orgID = uData["organization"];
    return _orgID;
  }

  getTenterEven(tender_even) {
    this.tender_even = tender_even;
  }
  setTenderEven() {
    return this.tender_even;
  }

  addOrgToLocalList(param) {
    const orgData = JSON.parse(localStorage.getItem("orgList"));
    orgData.push(param);
    this.setInLocalStorage("orgList", orgData);
  }

  /** Returns a List of Sub Contractors (after filtering all Organization), from Local Storage */
  getSubContractorList() {
    const orgData = JSON.parse(localStorage.getItem("orgList"));
    const _subList = (orgData as Array<any>).filter(item => {
      return item["orgType"][0] === "Sub";
    });
    return _subList;
  }

  /**Returns list of all Equipments from Local Storage */
  getEquipmentList() {
    const _allEquipList = JSON.parse(localStorage.getItem("equipList"));
    return _allEquipList;
  }

  /**Returns list of all Labours from Local Storage */
  getLabourList() {
    const _allLabourList = JSON.parse(localStorage.getItem("labourList"));
    return _allLabourList;
  }

  setTenderList(list) {
    this.tenderList = [];
    this.tenderList = [...list].reverse();
  }

  getTenderList() {
    return this.tenderList;
  }

  updateLocalTenderListByID(tData) {
    console.log("tData is >>>>>> ", tData);
    // after modifying tender line/subline/crew/trench the modified saved at local end
    const tID = tData._id;
    for (let i = 0; i < this.tenderList.length; i++) {
      4;
      if (this.tenderList[i]._id === tID) {
        this.tenderList.splice(i, 1, tData);
      }
    }
  }

  /** Returns list of all Crews from local storage */
  getCrewList() {
    const _allCrewList = JSON.parse(localStorage.getItem("allCrewList"));
    return _allCrewList;
  }
  /** Sets newly created crew in local storage after successful creation in BE */
  addCrewToLocalList(param) {
    const _crewLst = JSON.parse(localStorage.getItem("allCrewList"));
    _crewLst.push(param);
    this.setInLocalStorage("allCrewList", _crewLst);
  }
  //

  labourDataForChip(data) {
    this.labourStore = data.map(ev => {
      return Object.assign({ _id: ev._id, name: ev.name });
    });
    this.labourData.next(this.labourStore);
  }

  customPatternValid(patternParam: any): ValidatorFn {
    return (control: FormControl) => {
      const regexp: RegExp = patternParam.pattern;
      control.value.match();
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
    const _orgList = this.getOrgList();
    const client = _orgList.find(item => item.name === name);
    return client._id;
  }

  public findClientName(id) {
    const _orgList = this.getOrgList();
    const client = _orgList.find(item => item._id === id);
    if (client !== undefined) {
    }
    if (client !== undefined) {
      return client.name;
    } else if (client === undefined) {
      return "N. Available";
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

  // methods to crud with session Storage and local storage
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
  getFromLocalStorage(param) {
    return localStorage.getItem(param);
  }

  setInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  // methods space ends

  unique(list): [] {
    const Nlist: any = [...list];
    const unique = Nlist.filter((entry, i, flags) => {
      if (flags[entry.subContractorId._id]) {
        return false;
      }
      flags[entry.subContractorId._id] = true;
      return true;
    });
    return unique;
  }
  getSubName(data) {
    const orgData = JSON.parse(localStorage.getItem("orgList"));
    const k = orgData.filter(e => e._id === data);
    const j: any = {};
    const mappedArr = k.map(e => {
      j.name = e.name;
      console.log(e);
      j._id = e._id;
      return j;
    });
    const mappedObj = mappedArr[0];
    console.log(mappedObj);
    return mappedObj;
  }
}
