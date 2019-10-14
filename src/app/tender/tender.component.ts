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


   tender: any;
  ngOnInit() {
    this.tenderService.getTenders().subscribe((result) => {
      this.tender = result;
    })
  }

  onDelete(index) {
     this.tender.splice(index, 1);
  }
  constructor(private modalService: NgbModal, private tenderService: TenderService, private router: Router) {}

  open(item?) {
    const modalRef = this.modalService.open(TenderModalComponent, {centered: true});
    modalRef.componentInstance.tender = item || new Tender();

  }
  viewTender() {
    this.router.navigateByUrl('view-tender');
  }

}
