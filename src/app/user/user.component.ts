import { Component, OnInit } from '@angular/core';

import {TenderModalComponent} from '../modal/tender-modal/tender-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TenderService} from '../service/tender.service';
import {Tender} from '../model/tender.model';
import {ActivatedRoute, Router} from '@angular/router';
import { UserModalComponent } from 'app/modal/user-modal/user-modal.component';
import{ UserServiceService} from '../service/user-service.service';
import{User} from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  data:any={};
  user: User =new User();
  
public employee:any=[];
   tender: any;
   constructor(private userserv:UserServiceService)
   {

   }
  // user={    
  //   Name: 'Alish',
  //   Email:" agarg@thinfect.com",
  //   Password:1234,
  //   Mobile:1234567899
  // };

  ngOnInit(){
    // return this.employee = this.userserv.getemployee();
     return this.userserv.getusers().subscribe(data=>{ this.data=data;
       console.log(data)});
    
 
}
del(id):any{
  return this.userserv.del(id).subscribe(data=>{ this.data=data;
    console.log(data);
  });


  }
}

  // ngOnInit() {
  //   this.tenderService.getAll().subscribe((result) => {
  //     this.tender = result;
  //   })
  // }

  // onDelete(index) {
  //    this.tender.splice(index, 1);
  // }
  // constructor(private modalService: NgbModal, private tenderService: TenderService, private router: Router) {}

  // open(item?) {
  //   const modalRef = this.modalService.open(UserModalComponent, {centered: true});
  //   // modalRef.componentInstance.tender = item || new Tender();

  // }
  // viewTender() {
  //   this.router.navigateByUrl('view-tender');
  // }



