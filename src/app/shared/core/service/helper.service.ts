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

  constructor(private httpService: HttpService) {}

   getLabourData(data) {
    this.labourData.next(data);
    console.log(data)
  }
  getEquipmentData(data) {
    this.equipmentData.next(data);
    console.log(data)
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
