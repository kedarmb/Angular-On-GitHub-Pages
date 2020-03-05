import { Pipe, PipeTransform } from '@angular/core';
import { HelperService } from '../core/service/helper.service';

@Pipe({
  name: 'orgName'
})
export class OrgNamePipe implements PipeTransform {
  constructor(private hs: HelperService){}
  transform(value: any): any {
      const org = this.hs.getSubName(value);
    return org.name;
  }
}
