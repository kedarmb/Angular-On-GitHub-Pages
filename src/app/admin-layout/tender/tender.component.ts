import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TenderService } from '../../shared/core/service/tender.service';
import { Tender } from '../../shared/core/model/tender.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TenderModalComponent } from 'app/shared/components/tender-modal/tender-modal.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//
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
  ft: any;




  constructor(private modalService: NgbModal,
    private tenderService: TenderService,
    private router: Router, private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private httpServ: HttpService,
    private hs: HelperService,
    public tenderModalDialog: MatDialog) {
    console.log('TenderComponent instantiated');
  }


  ngOnInit() {
    //
    const id = setInterval(() => {
      let arr = this.hs.getOrgList();
      if (arr.length > 0) {
        console.log('arr .. ', arr);
        clearInterval(id);
        this.getAllTenders();
      }
    }, 300)

    // this.hs.getAllOrganization().subscribe((res) => {
    //   this.orgList = (res.body as Array<any>).filter((item) => {
    //     return item['orgType'][0] === 'Client';
    //   });
    //   

    // }, (err) => {
    //   console.log('err in fetching tender headers ', err)
    // })
    // this.spinner.show();
    /* this.tenderService.getAll().subscribe((result) => {
      console.log('all tenders list fetched');
      this.tenders = result;
      // this.spinner.hide();
    }, (err) => {
      console.log(err);
    }) */

  }
  //
  getAllTenders() {
    this.httpServ.getTenders().subscribe((result) => {
      // console.log('success in fetching tender headers ', result);
      this.tenders = result.body as Array<any>;
      this.ft = this.tenders.map(val => {
        console.log('val is .... ', val.clientName);
        const j = this.hs.findClientName(val.clientName);
        return val.clientName = j;
      })
      console.log(this.ft)
    }, (err) => {
      console.log('err in fetching tender headers ', err)
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
      console.log('The dialog was closed ', response);
      if (response.status === 'close' || response.status === undefined) {
        this.toastr.warning('Tender creation cancelled.', 'Cancelled');
      }
      if (response.status === 'add') {
        console.log(response.data);
        response.data.clientName = this.hs.findClientName(response.data.clientName);
        this.tenders.push(response.data);
      }
      if (response.status === 'update') {
        console.log(response.data);
        this.getAllTenders();

      }
    });
  }

  AddUpdateTender(val: boolean, tenderData?: {}, clients?: [], index?: number) {
    // const update: { data: { clients: Array<any>[], tender: any }, val: boolean } = { data, val };
    const update = { value: null, tender: null, indx: null };
    //
    //this.spinner.show();
    update.value = val;
    update.tender = tenderData;
    update.indx = index;
    //
    this.openTenderHeaderDialog(update);
    //


  }

  viewTender(tender) {
    // console.log(tender);
    // tender._id = '5dde7f6bfc6b8a42441783ab';
    this.router.navigateByUrl('view-tender/' + tender._id);
  }
  viewer(tender) {
    this.router.navigateByUrl('pdf-viewer/' + tender._id);
  }
  quotes(tender) {
    this.router.navigateByUrl('/quote');
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

}


/*
open(item?) {
    console.log(item)
    const modalRef = this.modalService.open(TenderModalComponent, { centered: true });
    modalRef.result.then(() => {
      this.tenderService.getAll().subscribe((tenders) => {
        this.toastr.info('Successfully added Tender', 'Congratulations.');
        this.tenders = tenders;
      })
    }).catch (err => {
  if (err === 0) {
    this.toastr.warning('Tender creation cncelled.', 'Cancelled');
  } else {
    this.toastr.error('Could not add the new Tender. Please try again later', 'Sorry!');
  }

  console.log('modal cancelled ', err);
})
modalRef.componentInstance.tender = JSON.parse(JSON.stringify(item || new Tender()));
  }
  //============================//

  editTender(item?) {
    console.log(item);
    const modalRef = this.modalService.open(TenderModalComponent, { centered: true });
    //
    modalRef.result.then(() => {
      //
    }).catch(err => {
      if (err === 0) {
        this.toastr.warning('Tender creation cncelled.', 'Cancelled');
      } else {
        this.toastr.error('Could not add the new Tender. Please try again later', 'Sorry!');
      }

      console.log('modal cancelled ', err);
    })
    modalRef.componentInstance.tender = item;
  }
*/
