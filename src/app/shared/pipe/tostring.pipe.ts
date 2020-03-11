import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tostring'
})
export class TostringPipe implements PipeTransform {

  transform(value: any): any {
    return value.toString();
  }

}
