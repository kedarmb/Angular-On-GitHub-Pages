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
  constructor(private httpService: HttpService, private modalService: NgbModal,
    private router: Router) { }
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.httpService.getAllUser()
      .subscribe((response: any) => {
        // console.log(response.body);
        if (response.status === 200) {
          // console.log(response.body);
          this.user = response.body;
        }
      }, error => {
        console.log('44:', error);
      });

  }
  del(): any {
    // return this.httpService.delUser(id).subscribe(data => {
    //   this.data = data;
    //   // console.log(data);
    // });
  }
  open() {
    const modalRef = this.modalService.open(UserModalComponent, { centered: true });
    modalRef.result.then((response) => {
      // console.log(response);
      // this.user = response;
      this.getUsers();
    })
  }
}
