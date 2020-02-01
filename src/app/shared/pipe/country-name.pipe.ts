import { Pipe, PipeTransform } from '@angular/core';
import csc from 'country-state-city'

@Pipe({
  name: 'countryName'
})
export class CountryNamePipe implements PipeTransform {

  transform(value: any): any {
    return csc.getCountryById(value).name;
  }


}
