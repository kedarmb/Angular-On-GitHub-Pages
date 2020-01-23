import { HttpService } from 'app/shared/core/service/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrewModalComponent } from '../../shared/components/crew-modal/crew-modal.component';
import { HelperService } from 'app/shared/core/service/helper.service';
import { MatTable, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
 })
export class CrewComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Description', 'Equipment', 'Labour', 'Actions'];
  data: any = {};
  laboursData; // holds data from labours get api
  equipmentsData; // holds data from equipment get api
  crew;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  update = {
    data: '',
    val: ''
  };
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
}
