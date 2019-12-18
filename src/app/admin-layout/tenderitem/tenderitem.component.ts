import { HttpService } from './../../shared/core/service/http.service';
import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
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
  constructor(private httpService:
                  HttpService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    /* this.httpService.getTendersItems().subscribe((result) => {
      this.tenderItems = result
    }) */
  }
  openItem(item?) {

  }
  openSubitem(item?) {

  }
  toggleCollapse(index) {
    this.accordion[index] = !this.accordion[index]
  }
  navigate() {
    this.router.navigateByUrl('/create-tenderitem');
  }

}
