import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HelperService } from '../../../shared/core/service/helper.service';
import { HttpService } from '../../../shared/core/service/http.service';

@Component({
  selector: 'app-invited-subcontractors',
  templateUrl: './invited-subcontractors.component.html',
  styleUrls: ['./invited-subcontractors.component.scss']
})
export class InvitedSubcontractorsComponent implements OnInit {

  @Output() public subs = new EventEmitter();
  @Input( ) notifiedSubs: string;
  notifiedSubList: any;
  selectedVal: any;
  notifiedSubIds = [];
  tenderID: any;
  responseData: any;
  constructor(private hs: HelperService, private httpServ: HttpService) { }

  ngOnInit() {
    this.getTenderByID()
  }
  private modifyNotifiedSubList() {
    if (this.notifiedSubIds.length <= 0) {
      return;
    }
    const subContList = this.hs.getSubContractorList();
    this.notifiedSubList = [];
    this.notifiedSubIds.forEach(element => {
      const sc = subContList.find(item => item._id === element);
      this.notifiedSubList.push(sc);
    });
    this.notifiedSubIds = [];
    console.log('notifiedSubList  ', this.notifiedSubList);
  }
  getTenderByID() {
    this.httpServ.getTenderDetailById(this.notifiedSubs).subscribe((response) => {
      if (response.status === 200) {
        this.hs.updateLocalTenderListByID(response.body);
        this.notifiedSubIds = response.body['headerLevelNotifiedSubs'];
        this.modifyNotifiedSubList();
        this.responseData = response.body;
      }
    },
      (err) => {
        console.log('Error getting Tender by id ', err);
      })
  }
  subSelection(subCont) {
    this.selectedVal = subCont;
    this.subs.emit(this.selectedVal);
  }

}
