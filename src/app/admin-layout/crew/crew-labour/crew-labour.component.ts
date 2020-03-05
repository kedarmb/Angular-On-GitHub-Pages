import { HelperService } from 'app/shared/core/service/helper.service';
import { HttpService } from 'app/shared/core/service/http.service';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { LabourModalComponent } from 'app/shared/components/labour-modal/labour-modal.component';
import { MatDialog, MatTable } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crew-labour',
  templateUrl: './crew-labour.component.html',
  styleUrls: ['./crew-labour.component.scss']
})
export class CrewLabourComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Description', 'Actions'];
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  valueChange: any;
  labour;
  update = {
    data: '',
    val: ''
  };
  constructor(
    private modalService: MatDialog,
    private httpService: HttpService,
    private helperService: HelperService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.labour = JSON.parse(
      this.helperService.getFromLocalStorage('labourList')
    );
  }

  getLabourData() {
    this.httpService.getAllLabour().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.labour = response.body;
          this.helperService.setInLocalStorage('labourList', this.labour);
          console.log(response.body);
          this.helperService.labourDataForChip(this.labour);
        }
      },
      error => {
        this.toastr.error(error.error.message);
        console.log(error);
      }
    );
  }
  addLabour(val) {
    this.update.val = val;
    console.log('updateLabour', this.update);
    this.openModal();
  }
  updateLabour(val, data) {
    this.update.val = val;
    this.update.data = data;
    console.log('updateLabour', this.update);
    this.openModal();
  }

  removeLabour(val, e) {
    this.httpService.deleteLabour(val._id).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.labour.splice(e, 1);
          this.helperService.setInLocalStorage('labourList', this.labour);
          this.table.renderRows();
          this.toastr.success('Removed Successfully');
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  openModal() {
    const modalRef = this.modalService.open(LabourModalComponent, {
      height: 'auto',
      width: '35%',
      data: this.update,
      disableClose: true
    });
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
      }
      if (response.status === 'add') {
        this.labour.push(response.data);
        this.helperService.setInLocalStorage('labourList', this.labour);
        this.table.renderRows();
      }
      if (response.status === 'update') {
        this.getLabourData();
        this.table.renderRows();
      }
    });
  }
}
