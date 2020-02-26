import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TenderModalComponent } from 'app/shared/components/tender-modal/tender-modal.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { NotifySubcontractorComponent } from 'app/shared/components/notify-subcontractor/notify-subcontractor.component';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {

  displayedColumns: string[] = ['Client Name', 'Tender Name', 'Open Date', 'Close Date', 'Quote Start Date', 'Quote End Date', 'Mode of Submission', 'Status', 'Actions'];
  tenders: Array<any> = [];
  orgList: any[];
  feMsg: string;
  //
  constructor(private router: Router, private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private httpServ: HttpService,
    private hs: HelperService,
    public tenderModalDialog: MatDialog,
    public dialog: MatDialog) {
    console.log('TenderComponent instantiated');
  }


  ngOnInit() {
    // this.hs.setOrgId();
    this.getAllTenders();

  }
  //
  getAllTenders() {
    // check if the list is available in the helper service
    if (this.hs.getTenderList().length === 0) {
      //
      this.spinner.show();
      this.feMsg = 'Loading your list of tenders..'
      const appendStr = '/0/0';
      this.httpServ.getTenders(appendStr).subscribe((result) => {
        // console.log('list of tenders ', result.body);
        this.hs.setTenderList(result.body as Array<any>);
        this.tenders = result.body.reverse() as Array<any>;
        // this.tenders.splice(1);
        if (this.tenders.length < 1) {
          this.feMsg = 'You do not have any listed tender now...'
        }
       //
        this.spinner.hide();
      }, (err) => {
        console.log('err in fetching tender headers ', err);
        this.spinner.hide();
      })

    } else if (this.hs.getTenderList().length > 0) {
      this.tenders = this.hs.getTenderList();
    }

  }
  /** Public Method to Add new Tender Header or Edit existing Tender Header. For editing pass
   * respective tender data to the method.
   */
  openTenderHeaderDialog(data) {
    const dialogRef = this.tenderModalDialog.open(TenderModalComponent, {
      width: '550px',
      data: data,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
        this.toastr.warning('', 'Operation cancelled');
      }
      if (response.status === 'add') {
        this.hs.setTenderList([]);
        this.getAllTenders();
      }
      if (response.status === 'update') {
        this.hs.setTenderList([]);
        this.getAllTenders();

      }
    });
  }


  AddUpdateTender(val: boolean, tenderData?: {}, clients?: [], index?: number) {
    const update = { value: null, tender: null, indx: null };
    update.value = val;
    update.tender = tenderData;
    update.indx = index;
    //
    this.openTenderHeaderDialog(update);
    //
  }
  //
  deleteTender(tenderData, index) {
    this.httpServ.deleteTenderById(tenderData._id).subscribe((res) => {
      this.tenders.splice(index, 1);
      this.toastr.info('Successfully deleted tender', 'Done');
    }, (err) => {
      console.log('error deleting ', err);
      this.toastr.error('Could not delete tender', 'Error!');
    })
  }

  viewTender(tender) {
    // console.log(tender);
    // tender._id = '5dde7f6bfc6b8a42441783ab';
    this.router.navigateByUrl('view-tender/', { state: tender });
  }

  viewer(tender) {
    this.router.navigateByUrl('pdf-viewer/' + tender._id);
  }

  quotes(tender) {
    this.router.navigateByUrl('quote');
  }

  fastQuote(tender) {
    console.log(tender)
    const url = 'fast-list/' + tender._id
    this.router.navigate([url], { state: { tender: tender._id} });
    this.hs.setSession('tenderIdNow', JSON.stringify(tender._id));
  }

  compare(tender) {
    this.router.navigateByUrl('/compare');
  }
  notifySubC(ele) {
    //
    console.log(ele)
    const dialogRef = this.dialog.open(NotifySubcontractorComponent, {
      height: '50%',
      width: '850px',
      data: { tenderID: ele._id },
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result);
      this.getAllTenders();
    });

  }
}
