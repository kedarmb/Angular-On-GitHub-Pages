import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TenderService } from '../../shared/core/service/tender.service';
import { Tender } from '../../shared/core/model/tender.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TenderModalComponent } from 'app/shared/components/tender-modal/tender-modal.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {

  displayedColumns: string[] = [ 'Client Name', 'Tender Name', 'Open Date', 'Close Date', 'Quote Start Date', 'Quote End Date', 'Actions'];
  tenders: any;

  constructor(private modalService: NgbModal,
    private tenderService: TenderService,
    private router: Router, private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

  }


  ngOnInit() {
    // this.spinner.show();
    this.tenderService.getAll().subscribe((result) => {
      console.log('all tenders list fetched');
      this.tenders = result;
      // this.spinner.hide();
    }, (err) => {
      console.log(err);
    })
  }

  delete(tender) {
    this.tenderService.delete(tender).subscribe(() => {
      this.tenderService.getAll().subscribe((tenders) => {
        this.tenders = tenders;
      })
    })
  }


  open(item?) {
    console.log(item)
    const modalRef = this.modalService.open(TenderModalComponent, { centered: true });
    modalRef.result.then(() => {
      this.tenderService.getAll().subscribe((tenders) => {
        this.toastr.info('Successfully added Tender', 'Congratulations.');
        this.tenders = tenders;
      })
    }).catch(err => {
      if (err === 0) {
        this.toastr.warning('Tender creation cncelled.', 'Cancelled');
      } else {
        this.toastr.error('Could not add the new Tender. Please try again later', 'Sorry!');
      }

      console.log('modal cancelled ', err);
    })
    modalRef.componentInstance.tender = JSON.parse(JSON.stringify(item || new Tender()));
  }

  viewTender(tender) {
    console.log(tender);
    tender._id = '5dde7f6bfc6b8a42441783ab';
    this.router.navigateByUrl('view-tender/' + tender._id);
  }
  viewer(tender) {
    this.router.navigateByUrl('pdf-viewer/' + tender._id);
  }
  quotes(tender) {
    this.router.navigateByUrl('/quote');
  }

}
