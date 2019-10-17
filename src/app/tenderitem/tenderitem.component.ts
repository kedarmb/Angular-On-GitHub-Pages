import { Component, OnInit } from '@angular/core';
import {TenderitemService} from '../service/tenderitem.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TenderItemModalComponent} from '../modal/tender-item-modal/tender-item-modal.component';
import {TenderSubitemModalComponent} from '../modal/tender-subitem-modal/tender-subitem-modal.component';
import {TenderSubitem} from '../model/tender-subitem.model';
import {TenderItem} from '../model/tender-item.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tenderitem',
  templateUrl: './tenderitem.component.html',
  styleUrls: ['./tenderitem.component.scss']
})
export class TenderitemComponent implements OnInit {

  tenderItems: any = [];
  isCollapsed = false;
  accordion = {};
  constructor(private tenderItemService:
                  TenderitemService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.tenderItemService.getTendersItems().subscribe((result) => {
      this.tenderItems = result
    })
  }
  openItem(item?) {
    const modalRef = this.modalService.open(TenderItemModalComponent, {centered: true});
    modalRef.componentInstance.tenderItem = item || new TenderItem();
  }
  openSubitem(item?) {
    const modalRef = this.modalService.open(TenderSubitemModalComponent, {centered: true});
    modalRef.componentInstance.tenderSubitem = item || new TenderSubitem();
  }
  toggleCollapse(index) {
    this.accordion[index] = !this.accordion[index]
  }
  navigate() {
    this.router.navigateByUrl('/create-tenderitem');
  }

}
