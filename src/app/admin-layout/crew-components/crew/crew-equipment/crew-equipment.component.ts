import { HelperService } from './../../../../shared/core/service/helper.service';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from 'app/shared/core/service/http.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { EquipmentsModalComponent } from 'app/shared/components/equipments-modal/equipments-modal.component';
import { LabourModalComponent } from 'app/shared/components/labour-modal/labour-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-crew-equipment',
  templateUrl: './crew-equipment.component.html',
  styleUrls: ['./crew-equipment.component.scss']
})
export class CrewEquipmentComponent implements OnInit {
  displayedColumns: string[] = [ 'Name', 'Rate', 'Description', 'Type', 'Actions'];
  equipments: any;
  constructor(private modalService: MatDialog, private httpService: HttpService, private helperService: HelperService) { }

  ngOnInit() {
    this.getEquipmentData()
  }
  getEquipmentData() {
    this.httpService.getAllEquipment().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.equipments = response.body
          this.helperService.getEquipmentData(this.equipments);
          console.log(response.body);
        }
      },
      error => {
        console.log(error);
      }
    )};
  openAddEquipmentModal() {
    const modalRef = this.modalService.open(EquipmentsModalComponent, {
      height: 'auto',
      width: '35%'
    });
    modalRef.afterClosed().subscribe((response) => {
      console.log(response);
      this.equipments.push(response);
    })
  }
}
