import { Component, OnInit } from '@angular/core';

import {TenderModalComponent} from '../modal/tender-modal/tender-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TenderService} from '../service/tender.service';
import {Tender} from '../model/tender.model';
import {ActivatedRoute, Router} from '@angular/router';
import { UserModalComponent } from 'app/modal/user-modal/user-modal.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
 	
  user={    
    Name: 'Alish',
    Email:" agarg@thinfect.com",
    Password:1234,
    Mobile:1234567899
  };
  tender: any;
  ngOnInit() {
    this.tenderService.getAll().subscribe((result) => {
      this.tender = result;
    })
  }

  onDelete(index) {
     this.tender.splice(index, 1);
  }
  constructor(private modalService: NgbModal, private tenderService: TenderService, private router: Router) {}

  open(item?) {
    const modalRef = this.modalService.open(UserModalComponent, {centered: true});
    // modalRef.componentInstance.tender = item || new Tender();

  }
  viewTender() {
    this.router.navigateByUrl('view-tender');
  }

}

