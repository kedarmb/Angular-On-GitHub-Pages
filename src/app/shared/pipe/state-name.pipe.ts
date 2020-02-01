import csc from 'country-state-city';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'stateName'
})
export class StateNamePipe implements PipeTransform {

  transform(value: any): any {
    return csc.getStateById(value).name;
  }


}
