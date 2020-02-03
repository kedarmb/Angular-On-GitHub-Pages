import { HttpService } from 'app/shared/core/service/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrewModalComponent } from '../../shared/components/crew-modal/crew-modal.component';
import { HelperService } from 'app/shared/core/service/helper.service';
import { MatTable, MatDialog, MatTabChangeEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrewEquipmentComponent } from './crew-equipment/crew-equipment.component';
import { CrewLabourComponent } from './crew-labour/crew-labour.component';
@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
 })
export class CrewComponent implements OnInit {
  @ViewChild(CrewEquipmentComponent, {static: false}) eq: CrewEquipmentComponent;
  @ViewChild(CrewLabourComponent, {static: false}) lb:CrewLabourComponent;
  displayedColumns: string[] = ['Name', 'Description', 'Equipment', 'Equipment Rate', 'Labour', 'Labour Rate', 'Actions'];
  data: any = {};
  laboursData; // holds data from labours get api
  equipmentsData; // holds data from equipment get api
  crew;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  update = {
    data: '',
    val: ''
  };
  titleButton='Add Crew'
  valueChange: any;
  public show = false;
  public buttonName = 'Show';

  constructor(private spinner: NgxSpinnerService,
    private hs: HelperService,
    private http: HttpService,
    private toastr: ToastrService,
    private modalService: MatDialog) {
    this.hs.equipmentData.subscribe((response) => {
      this.equipmentsData = response
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    })
    this.hs.labourData.subscribe((response) => {
      this.spinner.show();
      this.laboursData = response;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    })
  }

  ngOnInit() {
    this.getCrews();
    console.log("getCrews():", this.getCrews());
    
  }

  getCrews() {
    this.http.getAllCrews()
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.crew = response.body;
        }
      }, error => {
        console.log('error:', error);
      });
  }

  openModal() {
    const modalRef = this.modalService.open(CrewModalComponent, {
      height: 'auto',
      width: '35%', data: this.update, disableClose: true
    });
    modalRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
        console.log(response.data);
      }
      if (response.status === 'add') {
        console.log(response);
        this.crew.push(response.data);
        this.table.renderRows();
      }
      if (response.status === 'update') {
        console.log(response.data);
        this.getCrews()
        this.table.renderRows();
      }
    });
  }
  addEquipment() {
    this.eq.addEq(false);
  }
  addLabour() {
    this.lb.addLabour(false);
  }
  addCrew(val) {
    this.update.val = val
    this.openModal();
  }

  updateCrew(val, data) {
    this.update.val = val
    this.update.data = data
    this.openModal();
  }

  removeCrew(val, e) {
    this.crew.splice(e, 1)
    this.table.renderRows();
    this.http.deleteCrewTemplate(val._id)
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.toastr.error(response)
        }
      }, error => {
          this.toastr.error(error.error.message)
        })
  }
  onTabChange(e: MatTabChangeEvent){
    console.log(e);
    if(e.index==0){
      console.log()
      this.titleButton = 'Add Crew'
    }
    if(e.index==1){
      this.titleButton = 'Add Equipment'
    }
    if(e.index==2){
      this.titleButton = 'Add labour'
    }
  }
}
