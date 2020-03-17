import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HelperService } from '../../../shared/core/service/helper.service';
import { HttpService } from '../../../shared/core/service/http.service';

@Component({
  selector: 'app-invited-subcontractors',
  templateUrl: './invited-subcontractors.component.html',
  styleUrls: ['./invited-subcontractors.component.scss']
})
export class InvitedSubcontractorsComponent implements OnInit {
  @Output() public subs = new EventEmitter();
  @Input() notifiedSubs: string;
  notifiedSubList = [];
  selectedVal: any;
  notifiedSubIds = [];
  tenderID: any;
  responseData: any;
  @Output() dataLoaded = new EventEmitter<string>();
  @Output() subSelected = new EventEmitter<string>();
  //
  constructor(private hs: HelperService, private httpServ: HttpService) {}

  ngOnInit() {
    this.getTenderByID();
  }
  private modifyNotifiedSubList() {
    if (this.notifiedSubIds.length <= 0) {
      return;
    }
    const subContList = this.hs.getSubContractorList();
    // console.log('subContList... is ... ', subContList);
    // console.log('notifiedSubIds... is ... ', this.notifiedSubIds);
    this.notifiedSubList = [];
    this.notifiedSubIds.forEach(element => {
      const sc = subContList.find(item => item._id === element);
      this.notifiedSubList.push(sc);
    });
    this.notifiedSubIds = [];
    // console.log('notifiedSubList ---->> ', this.notifiedSubList);
    //
    this.dataLoaded.emit();
  }
  getTenderByID() {
    this.httpServ.getTenderDetailById(this.notifiedSubs).subscribe(
      response => {
        if (response.status === 200) {
          this.hs.updateLocalTenderListByID(response.body);
          this.notifiedSubIds = response.body['headerLevelNotifiedSubs'];
          this.modifyNotifiedSubList();
          this.responseData = response.body;
        }
      },
      err => {
        console.log('Error getting Tender by id ', err);
      }
    );
  }
  subSelection(subCont) {
    // console.log(subCont);
    this.selectedVal = subCont;
    this.subSelected.emit(subCont);
  }
}
