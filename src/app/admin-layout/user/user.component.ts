import { HttpService } from './../../shared/core/service/http.service';
import { UserModalComponent } from './../../shared/components/user-modal/user-modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  data: any = {};
  user: User = new User();

  public employee: any = [];
  tender: any;
  constructor(private httpService: HttpService, private modalService: NgbModal,
    // private tenderService: TenderService,
    private router: Router) {

  }
  // user={
  //   Name: 'Alish',
  //   Email:" agarg@thinfect.com",
  //   Password:1234,
  //   Mobile:1234567899
  // };

  ngOnInit() {
    // return this.employee = this.userserv.getemployee();
    return this.httpService.getUser().subscribe(data => {
    this.data = data;
      console.log(data)
    });


  }
  del(): any {
    // return this.httpService.delUser(id).subscribe(data => {
    // this.data = data;
    //   console.log(data);
    // });


  }


  open(item?) {
    const modalRef = this.modalService.open(UserModalComponent, { centered: true });
    modalRef.result.then((user) => {
      console.log(user);
      /* this.userserv.getAll().subscribe((users) => {
        this.tenders = tenders;
      }) */
    }).catch(err => {
      console.log('modal cancelled ', err);
    })
    modalRef.componentInstance.tender = JSON.parse(JSON.stringify(item || new User()));
  }


}// End of class

  // ngOnInit() {
  //   this.tenderService.getAll().subscribe((result) => {
  //     this.tender = result;
  //   })
  // }

  // onDelete(index) {
  //    this.tender.splice(index, 1);
  // }
  // constructor(private modalService: NgbModal, private tenderService: TenderService, private router: Router) {}


  // viewTender() {
  //   this.router.navigateByUrl('view-tender');
  // }



