import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TenderModalComponent } from 'app/shared/components/tender-modal/tender-modal.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {

  displayedColumns: string[] = ['Client Name', 'Tender Name', 'Open Date', 'Close Date', 'Quote Start Date', 'Quote End Date', 'Actions'];
  tenders: Array<any> = [];
  orgList: any[];
  feMsg: string;
  //
  constructor(private router: Router, private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private httpServ: HttpService,
    private hs: HelperService,
    public tenderModalDialog: MatDialog) {
    console.log('TenderComponent instantiated');
  }


  ngOnInit() {
    this.hs.setOrgId();
    this.spinner.show();
    this.getAllTenders();

  }
  //
  getAllTenders() {
    this.feMsg = 'Loading your list of tenders..'
    const appendStr = '/0/0';
    // const appendStr = '/orgId/' + this.hs.getOrgId() + '/0/0';
    // console.log('appended string is ', appendStr);
    this.httpServ.getTenders(appendStr).subscribe((result) => {
      // console.log('success in fetching tender headers ', result);
      this.tenders = result.body as Array<any>;
      // this.tenders.splice(1);
      if (this.tenders.length < 1) {
        this.feMsg = 'You do not have any listed tender now..'
      }
      console.log(this.tenders);
      this.hs.setOrgList();
      this.hs.setEqupmentList();
      this.hs.setLabourList();
      //
      /* this.tenders.map(val => {
        // console.log('_id is .... ', val.clientName);
        const j = this.hs.findClientName(val.clientName);
        val.clientName = j;
      }) */
      //
      // this.hs.hideSpinner();
      this.spinner.hide();
    }, (err) => {
      console.log('err in fetching tender headers ', err);
      this.spinner.hide();
    })
  }
  /** Public Method to Add new Tender Header or Edit existing Tender Header. For editing pass
   * respective tender data to the method.
   */
  openTenderHeaderDialog(data) {
    // console.log('data is .. ', data);
    const dialogRef = this.tenderModalDialog.open(TenderModalComponent, {
      width: '550px',
      data: data,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(response => {
      //
      console.log('The dialog was closed ', response);
      if (response.status === 'close' || response.status === undefined) {
        this.toastr.warning('Tender creation cancelled.', 'Cancelled');
      }
      if (response.status === 'add') {
        console.log(response.data);
        // response.data.clientName = this.hs.findClientName(response.data.clientName);
        // this.tenders.push(response.data);
        this.justGetTenders();
      }
      if (response.status === 'update') {
        console.log(response.data);
        this.getAllTenders();

      }
    });
  }

  justGetTenders() {
    const appendStr = '/0/0';
    this.httpServ.getTenders(appendStr).subscribe((result) => {
      this.tenders = result.body as Array<any>;
      if (this.tenders.length < 1) {
        this.feMsg = 'You do not have any listed tender now..'
      }
    }, (err) => {
      console.log('err in fetching tender headers ', err);
    })
  }
  AddUpdateTender(val: boolean, tenderData?: {}, clients?: [], index?: number) {
    // const update: { data: { clients: Array<any>[], tender: any }, val: boolean } = { data, val };
    const update = { value: null, tender: null, indx: null };
    //
    update.value = val;
    update.tender = tenderData;
    update.indx = index;
    //
    this.openTenderHeaderDialog(update);
    //


  }
  //
  deleteTender(tenderData, index) {
    // console.log(tenderData, index)
    this.httpServ.deleteTenderById(tenderData._id).subscribe((res) => {
      console.log('success deleting tender', res);
      this.tenders.splice(index, 1);
      this.toastr.info('Successfully deleted tender', 'Done');
    }, (err) => {
      console.log('error deleting ', err);
      this.toastr.error('Could not delete tender', 'Error!');
    })
  }
  //
  viewTender(tender) {
    console.log(tender);
    // tender._id = '5dde7f6bfc6b8a42441783ab';
    this.router.navigateByUrl('view-tender/', { state: tender });
  }
  viewer(tender) {
    this.router.navigateByUrl('pdf-viewer/' + tender._id);
  }
  quotes(tender) {
    this.router.navigateByUrl('/quote');
  }
  //

}
