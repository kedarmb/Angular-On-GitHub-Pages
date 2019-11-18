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
  data:any;
  lab:Labour=new Labour();

  constructor(private labourserv:LabourService,private modalService: NgbModal,private router: Router) { }
  
  ngOnInit(){

  }
  
  open(item?) {
    const modalRef = this.modalService.open(LobourModalComponent, {centered: true});
    const obj = {};
    for (const i in item) {
        obj[i] = item[i];
    }
    modalRef.componentInstance.labour = obj || new Labour();
    modalRef.result.then(() => {

    })

}

submit(labourForm){

  console.log('hi alish')
  return;
  for(let i in labourForm.controls){
    this.lab[i]=labourForm.controls[i].value;
  }
  console.log(this.lab)
  this.labourserv.create(this.lab).subscribe(data=>{

    this.data=data
    console.log(data);
  });
}


}


