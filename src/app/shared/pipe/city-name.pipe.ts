import csc from 'country-state-city';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cityName'
})
export class CityNamePipe implements PipeTransform {

  transform(value: any): any {
    return csc.getCityById(value).name;
  }

}
