import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log('***************************', value);
    return null;
  }

}
