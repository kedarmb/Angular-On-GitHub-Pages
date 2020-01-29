import { HttpService } from './../../shared/core/service/http.service';
import { UserModalComponent } from './../../shared/components/user-modal/user-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatTable } from '@angular/material';
import User from 'app/shared/core/model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit {
  displayedColumns: string[] = ['Email', 'First Name', 'Last Name', 'Mobile', 'Role', 'Status', 'Actions'];
  data: any = {};
  user
  public employee: any = [];
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  update = {
    data: '',
    val: ''
  };
  constructor(private httpService: HttpService,
    private modalService: MatDialog,
    private router: Router) { }
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.httpService.getAllUser()
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.user = response.body;
        }
      }, error => {
        console.log('44:', error);
      });
  }

  openModal() {
    const modalRef = this.modalService.open(UserModalComponent, {
      height: 'auto',
      width: '35%', data: this.update, disableClose: true
    });
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
        console.log(response.data);
      }
      if (response.status === 'add') {
        console.log(response);
        this.user.push(response.data);
        this.table.renderRows();
      }
      if (response.status === 'update') {
        console.log(response.data);
        this.getUsers()
        this.table.renderRows();
      }
    });
  }
  
  addUser(val) {
    this.update.val = val
    this.openModal();
  }
  updateUser(val, data) {
    this.update.val = val
    this.update.data = data
    this.openModal();
  }
  removeUser(val, e) {
    this.user.splice(e, 1)
    this.table.renderRows();
    this.httpService.deleteOrganization(val._id)
      .subscribe((response: any) => {
        if (response.status === 200) {
        }
      }, error => {
        console.log(error);
      })
  }
}
