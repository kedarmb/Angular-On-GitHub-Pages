import { Component, OnInit } from '@angular/core';
import{LabourService} from '../../service/labour.service';
import {ActivatedRoute, Router} from '@angular/router';

import { LobourModalComponent } from 'app/modal/lobour-modal/lobour-modal.component';


import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import Labour from '../../model/labour.model';





@Component({
  selector: 'app-labour',
  templateUrl: './labour.component.html',
  styleUrls: ['./labour.component.scss']
})
export class LabourComponent implements OnInit {
  labour:any={};

  constructor(private labourserv:LabourService,private modalService: NgbModal,private router: Router) { }

  ngOnInit(){
    this.labourserv.create(this.labour).subscribe((data) => {
      this.labour = data;
  })
  }
  open(item?) {
    const modalRef = this.modalService.open(LobourModalComponent, {centered: true});
    const obj = {};
    for (const i in item) {
        obj[i] = item[i];
    }
    modalRef.componentInstance.labour = obj || new Labour();
    modalRef.result.then(() => {
        this.labourserv.create(this.labour).subscribe((labour) => {
            console.log('.>>>>>>>>>>>>>>>>>>>>>>>>>', labour);
            this.labour = labour;LabourService
        });
    })

}

}


