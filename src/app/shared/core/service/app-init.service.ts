import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { HttpService } from './http.service';
// import { promise } from 'protractor';
import { Observable, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private hs: HelperService, private httpServ: HttpService) {
    //
  }

  init() {
    // promise.all([this.loadOrganizationData(), ])
    return new Promise((resolve, reject) => {
      //
      const orgData = this.httpServ.getAllOrganization();
      // console.log('org data is ', orgData);
      const equipData = this.httpServ.getAllEquipment();
      //
      forkJoin([orgData, equipData]).subscribe(results => {
        console.log('fork join resolved all ----');
        console.log(results);
        resolve(results);
      })
      //
    });
  }
  //
  loadOrganizationData() {
    /* return new Promise<any>((resolve, reject) => {
      this.hs.getAllOrganization().subscribe((val) => {
        resolve(val);

      })

    }) */


  }
  loadCrewData() {

  }
  loadEquipmentsData() {
  }
}
