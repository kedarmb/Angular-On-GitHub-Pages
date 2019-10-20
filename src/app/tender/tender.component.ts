import { Component, OnInit } from '@angular/core';

import {TenderModalComponent} from '../modal/tender-modal/tender-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TenderService} from '../service/tender.service';
import {Tender} from '../model/tender.model';
import {ActivatedRoute, Router} from '@angular/router';

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
  constructor(private modalService: NgbModal, private tenderService: TenderService, private router: Router) {}

  open(item?) {
    const modalRef = this.modalService.open(TenderModalComponent, {centered: true});
    modalRef.result.then(() => {
      this.tenderService.getAll().subscribe((tenders) => {
        this.tenders = tenders;
      })
    })
    modalRef.componentInstance.tender = JSON.parse(JSON.stringify(item || new Tender()));

  }

  viewTender(tender) {
    this.router.navigateByUrl('view-tender/' + tender.id);
  }

}
