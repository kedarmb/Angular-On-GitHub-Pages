import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Labour from '../../model/labour.model';
import {LabourFormGroup, LabourFormControl} from './labour.validator'
import{LabourService} from '../../service/labour.service';
@Component({
  selector: 'app-lobour-modal',
  templateUrl: './lobour-modal.component.html',
  styleUrls: ['./lobour-modal.component.scss']
})
export class LobourModalComponent implements OnInit {
  labourForm:LabourFormGroup= new LabourFormGroup();
  data:any={};
  

  constructor(public activeModal: NgbActiveModal,private labourserv:LabourService) { }
  labour:Labour;
  ngOnInit() {

  }
  close(){
    this.activeModal.close('closed');
  }

 

submit() {
 
  this.activeModal.close('closed');
  // return this.labourserv.create(this.user).subscribe(data=>{ this.data=data;
  
  //   console.log(data)});
 
}
}


