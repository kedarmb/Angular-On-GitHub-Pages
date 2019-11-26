import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TenderService } from '../../shared/core/service/tender.service';
import { Tender } from '../../shared/core/model/tender.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TenderModalComponent } from 'app/shared/components/tender-modal/tender-modal.component';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {


  tenders: any;
  ngOnInit() {
    this.tenderService.getAll().subscribe((result) => {
      this.tenders = result;
    })
  }

  delete(tender) {
    this.tenderService.delete(tender).subscribe(() => {
      this.tenderService.getAll().subscribe((tenders) => {
        this.tenders = tenders;
      })
    })
  }
  constructor(private modalService: NgbModal,
    private tenderService: TenderService,
    private router: Router) {

  }

  open(item?) {
    const modalRef = this.modalService.open(TenderModalComponent, { centered: true });
    modalRef.result.then(() => {
      this.tenderService.getAll().subscribe((tenders) => {
        this.tenders = tenders;
      })
    }).catch(err =>{
      console.log('modal cancelled ',err);
    })
    modalRef.componentInstance.tender = JSON.parse(JSON.stringify(item || new Tender()));
  }

  viewTender(tender) {
    this.router.navigateByUrl('view-tender/' + tender.id);
  }
  viewer(tender) {
    this.router.navigateByUrl('pdf-viewer/' + tender.id);
  }
  quotes(tender) {
    this.router.navigateByUrl('/quote');
  }

}
