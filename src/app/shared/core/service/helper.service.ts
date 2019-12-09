import { Engineer } from './../model/crew.model';
import { HttpService } from 'app/shared/core/service/http.service';
import { Injectable } from '@angular/core';
import { ValidatorFn, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  // labourData: any;
  equipmentData = new BehaviorSubject<any>('');
  labourData = new BehaviorSubject<any>('');
  equipmentStore: any;
  labourStore: any
  private allowFreeTextAddEngineer = false;
  public chipSelectedEngineers: Engineer[] = [];
  constructor(private httpService: HttpService) {}
   getLabourData(data) {
     this.labourStore = data.map((ev) => {
       return Object.assign({ _id: ev._id, name: ev.name })
      })
      this.labourData.next(this.labourStore);
     console.log(this.labourStore)

  }
  getEquipmentData(data) {
    // console.log(data)
    this.equipmentStore = data.map((ev) => {
      return Object.assign({ _id: ev._id, name: ev.name })
    })
    this.equipmentData.next(this.equipmentStore);
  }

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

  customPatternValid(patternParam: any): ValidatorFn {
    return (control: FormControl) => {
      const regexp: RegExp = patternParam.pattern;
      if (control.value && !control.value.match(regexp)) {
        return {
          invalidMsg: patternParam.msg
        };
      } else {
        return null;
      }
    };
  }

}
