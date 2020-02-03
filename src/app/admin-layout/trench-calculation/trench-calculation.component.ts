import { TrenchModalComponent } from './../../shared/components/trench-modal/trench-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatDialog } from '@angular/material';
import { HttpService } from 'app/shared/core/service/http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-trench-calculation',
  templateUrl: './trench-calculation.component.html',
  styleUrls: ['./trench-calculation.component.scss']
})
export class TrenchCalculationComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Bedding Length', 'Bedding Width', 'Bedding Height', 'Bedding Volume', 'Pipe Diameter',
                                'Pipe Volume', 'Effective Volume', 'Density Bedding', 'Bedding Weight', 'Backfill Length',
                                'Backfill Weight', 'Actions']
  isAdmin: true;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  trenchCal;
  valueChange: any;
  data: any = [];
  update = {
    data: '',
    val: ''
  };
  constructor(private modalService: MatDialog,
    private httpService: HttpService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getTrench()
  }
  getTrench() {
    this.httpService.getAllTrenches()
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.trenchCal = response.body;
        }
      }, error => {
        console.log('error:', error);
      });
  }
  openModal() {
    const modalRef = this.modalService.open(TrenchModalComponent, {
      data: this.update, disableClose: true
    });
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
        console.log(response.data);
      }
      if (response.status === 'add') {
        console.log(response);
        this.trenchCal.push(response.data);
        this.table.renderRows();
      }
      if (response.status === 'update') {
        console.log(response.data);
        this.getTrench()
        this.table.renderRows();
      }
    });
  }

  renderModal() {
    this.getTrench()
    this.table.renderRows();
    console.log('rendered table');

  }

  updateTrench(val, data) {
    this.update.val = val
    this.update.data = data
    this.openModal();
  }
  removeTrench(val, e) {
    this.httpService.deleteTrenchUrl(val._id)
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.trenchCal.splice(e, 1)
          this.table.renderRows();
          this.toastr.success('Removed Successfully')
        }
      }, error => {
        this.toastr.error(error.error.message)
      })
  }
}
