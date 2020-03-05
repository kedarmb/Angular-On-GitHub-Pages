import csc from 'country-state-city';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeNameFinder'
})
export class PlaceNameFinderPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (args == 'city') {
      return csc.getCityById(value).name;
    }
    if (args == 'country') {
      return csc.getCountryById(value).name;
    }
    if (args == 'state') {
      return csc.getStateById(value).name;
    }
  }
}
