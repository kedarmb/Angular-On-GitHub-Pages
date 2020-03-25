import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../../../shared/core/service/http.service';
import { HelperService } from '../../../shared/core/service/helper.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import _ from 'lodash';

@Component({
  selector: 'app-view-tender',
  templateUrl: './view-tender.component.html',
  styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent implements OnInit {

  displayedColumns: string[] = [
    'ItemNo',
    'SpecNo',
    'ItemName',
    'Description',
    'Unit',
    'Unit-Price',
    'Quantity',
    'TotalPrice'
  ];
  masterForm: FormGroup; // var to store form
  tender; // model instance
  lineItemsArr: any;
  // colla
  model: any;
  searching = false;
  searchFailed = false;
  states = [];
  lineItems: any = [];
  //
  tenderID: any;
  sections = [];
  loadedSections = [];

  responseData: any;
  //
  notifiedSubList: any;
  notifiedSubIds = []; // for temporarily storing heder level notified subs IDS
  selectedVal: any;
  invitedSubs: any;
  //
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private hs: HelperService,
    private httpServ: HttpService,
    private spinner: NgxSpinnerService,
    public sectionModalDialog: MatDialog,
    private toastr: ToastrService
  ) {
    //
    this.activatedRoute.params.subscribe(params => {
      // console.log('view tender params ', window.history.state);
      const paramData = window.history.state;
      this.tenderID = paramData._id;
      this.invitedSubs = this.tenderID;
      console.log('param data .. ', paramData);
      this.notifiedSubIds = paramData['headerLevelNotifiedSubs'];
      // this is a temporary fix :
      if (this.notifiedSubIds.length === 0) {
        this.onDataLoaded();
      }
      // this.modifyNotifiedSubList();
      this.setDataforQuotePage(paramData);

      //
      return;
    });
  }

  /* subSelection(subCont) {
        console.log(subCont);
        this.selectedVal = subCont;
    }
 */
  setDataforQuotePage(data) {
    // delete data.createdAt;
    // delete data.updatedAt;
    // delete data.headerLevelNotifiedSubs;
    delete data.navigationId;
    this.responseData = data;
  }
  //
  ngOnInit() {
    console.log('ngOnInit invoked ...');
    this.modifyNotifiedSubList();
  }
  onDataLoaded() {
    this.spinner.hide();
  }
  onSubContSelect(sc) {
    // console.log(sc);
    this.selectedVal = sc;
  }
  //
  back() {
    this.router.navigateByUrl('/tender');
  }
  //
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
    // console.log('notifiedSubList  ', this.notifiedSubList);
  }
  viewer(item) {
    this.router.navigateByUrl('/pdf-viewer/' + item.id);
  }
}
// End of class
