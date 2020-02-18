import { HelperService } from './../../../shared/core/service/helper.service';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from 'app/shared/core/service/http.service';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { EquipmentsModalComponent } from 'app/shared/components/equipments-modal/equipments-modal.component';
import { LabourModalComponent } from 'app/shared/components/labour-modal/labour-modal.component';
import { MatDialog, MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr/toastr/toastr.service';

@Component({
  selector: 'app-crew-equipment',
  templateUrl: './crew-equipment.component.html',
  styleUrls: ['./crew-equipment.component.scss']
})
export class CrewEquipmentComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Description', 'Actions'];
  equipments;
  update = {
    data: '',
    val: ''
  };
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  /* equipmentsData: any;
  laboursData: any; */
  constructor(private modalService: MatDialog,
    private toastr: ToastrService,
    private httpService: HttpService,
    private hs: HelperService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    console.log('helper service ..');
    //
    
  }

  ngOnInit() {
    // this.getEquipmentData();
    this.equipments = JSON.parse(this.hs.getFromLocalStorage('equipList'));
    // this.laboursData = JSON.parse(this.hs.getFromLocalStorage('labourList'));
  }
  getEquipmentData() {
    // this.equipments = this.equipmentsData
    this.httpService.getAllLabourEquipment()
      .subscribe((response: any) => {
        if (response.status === 200) {
          //this.equipments = response.body;
          //this.hs.setInLocalStorage('equipList', this.equipments);
          console.log(response.body);
        }
      },
        error => {
          console.log(error);
        }
      )

  };
  openModal() {
    const modalRef = this.modalService.open(EquipmentsModalComponent, {
      height: 'auto',
      width: '35%', data: this.update, disableClose: true
    });
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
      }
      if (response.status === 'add') {
        this.equipments.push(response.data);
        console.log('response after saving equip.. ', response.data);
        this.hs.setInLocalStorage('equipList', this.equipments);
        this.table.renderRows();
      }
      if (response.status === 'update') {
        this.getEquipmentData()
        this.table.renderRows();
      }
    });
  }

  addEq(val) {
    this.update.val = val
    this.openModal();
  }
  updateEq(val, data) {
    this.update.val = val
    this.update.data = data
    this.openModal();
  }
  removeEquipment(val, e) {
    this.httpService.deleteEquipment(val._id)
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.equipments.splice(e, 1);
          this.hs.setInLocalStorage('equipList', this.equipments);
          this.table.renderRows();
          this.toastr.success('Removed Successfully')
        }
      }, error => {
        this.toastr.error(error.error.message)
      })
  }
  // removeEquipment(val, e) {
  //   this.httpService.deleteOrganization(val._id)
  //     .subscribe((response: any) => {
  //       if (response.status === 200) {
  //         this.equipments.splice(e, 1)
  //         this.table.renderRows();
  //         // this.toastr.success('Removed Successfully')
  //       }
  //     }, error => {
  //       // this.toastr.error(error.error.message)
  //     })
  // }
}
