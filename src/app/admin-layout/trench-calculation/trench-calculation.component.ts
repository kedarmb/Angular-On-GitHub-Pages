import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTable, MatDialog } from '@angular/material';
import { HttpService } from 'app/shared/core/service/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrenchModalComponent } from 'app/shared/components/trench-modal/trench-modal.component';

@Component({
  selector: 'app-trench-calculation',
  templateUrl: './trench-calculation.component.html',
  styleUrls: ['./trench-calculation.component.scss']
})
export class TrenchCalculationComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Bedding Length', 'Bedding Width', 'Bedding Height', 'Bedding Volume', 'Pipe Diameter',
                                'Pipe Volume', 'Effective Volume', 'Density Bedding', 'Bedding Weight', 'Backfill Length',
                                'Backfill Weight', 'Actions']

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  trenchCal;

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
  getTrench(){

  }

  addTrench(val) {
    this.update.val = val
    // this.openModal();
  }
  updateTrench(val, data) {
    this.update.val = val
    this.update.data = data
    // this.openModal();
  }
  removeTrench(val, e) {
    this.httpService.deleteOrganization(val._id)
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
