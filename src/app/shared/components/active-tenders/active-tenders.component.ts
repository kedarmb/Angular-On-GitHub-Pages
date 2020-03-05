import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
@Component({
  selector: 'app-active-tenders',
  templateUrl: './active-tenders.component.html',
  styleUrls: ['./active-tenders.component.scss']
})
export class ActiveTendersComponent implements OnInit {
  tenderID: any;
  tenderData = [];
  tender: any;
  invitedSubs: any;
  constructor(private hs: HelperService, private httpService: HttpService) {
    this.tenderID = JSON.parse(this.hs.getSession('tenderIdNow'));
    this.invitedSubs = this.tenderID;
  }
  ngOnInit() {
    this.getTenderByID();
  }
  getTenderByID() {
    console.log(this.tenderID);
    this.httpService.getTenders('/0/0').subscribe(
      response => {
        if (response.status === 200) {
          this.hs.setSession('tenderDataNow', JSON.stringify(response.body));
          this.tenderData = JSON.parse(this.hs.getSession('tenderDataNow'));
          console.log(this.tenderData);
        }
      },
      err => {
        console.log('Error getting Tender by id ', err);
      }
    );
  }
  getTender(tenderdata: any) {
    console.log(tenderdata);
    this.hs.setSession('tenderIdNow', JSON.stringify(tenderdata));
  }
}
