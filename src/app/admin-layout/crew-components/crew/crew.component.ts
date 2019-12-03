import { CrewEquipmentComponent } from './crew-equipment/crew-equipment.component';
import { Component, OnInit } from '@angular/core';
import {NgbMarkDisabled} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { CrewModalComponent } from '../../../shared/components/crew-modal/crew-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Crew} from '../../../shared/core/model/crew.model';
import {CrewService} from '../../../shared/core/service/crew.service';
import {Router} from '@angular/router';
import { EquipmentsModalComponent } from 'app/shared/components/equipments-modal/equipments-modal.component';
import { LabourModalComponent } from 'app/shared/components/labour-modal/labour-modal.component';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit {

   crews: Crew[];
  httpService: any;
  organizationForm: any;
  activeModal: any;
  valueChange: any;
  constructor(private modalService: NgbModal, private crewService: CrewService, private router: Router) { }

  ngOnInit() {
     
  }

getCrewData() {
  this.httpService.labour(this.organizationForm.value).subscribe(
        (response: any) => {
          console.log(response);
          if (response.status === 200) {
            this.activeModal.close('closed');
            this.valueChange.emit(response.status);
          }
        },
        error => {
          console.log(error);
        }
      )};

  open(crew?) {
    const modalRef = this.modalService.open(CrewModalComponent, {centered: true, size: 'lg'});
  }
  delete(crew) {
     this.crewService.delete(crew).subscribe(() => {
       this.crewService.getAll().subscribe((crews) => {
        this.crews = crews;
       });
     })
  }

  getLabour(crew) {

    let str = '';
    for (let i = 0; i < crew.labours.length; i++) {

      if (i === crew.labours.length - 1) {
        str += crew.labours[i].name;
      } else {
        str += crew.labours[i].name + ',';
      }
    }

    return str;
  }

  getEquipment(crew) {
    let str = '';

    for (let i = 0; i < crew.equipments.length; i++) {

      if (i === crew.equipments.length - 1) {
        str += crew.equipments[i].name;
      } else {
        str += crew.equipments[i].name + ',';
      }
    }

    return str;
  }

  edit(crew) {
        this.router.navigateByUrl('/create-crew/' + crew.id);
  }
  openAddEquipmentModal() {
    const modalRef = this.modalService.open(EquipmentsModalComponent, { centered: true });
  }
}