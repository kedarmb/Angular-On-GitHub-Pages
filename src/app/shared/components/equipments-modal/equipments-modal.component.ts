import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { EquipmentsService } from 'app/service/equipments.service';
import Equipments from 'app/model/equipments.model';

@Component({
  selector: 'app-equipments-modal',
  templateUrl: './equipments-modal.component.html',
  styleUrls: ['./equipments-modal.component.scss']
})
export class EquipmentsModalComponent implements OnInit {

  @Input('equipments')
  equipments: Equipments;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal, private equipmentsService: EquipmentsService) {}

  ngOnInit() {
  }

  close() {
    this.activeModal.close('closed');
  }
     save(equipments) {
    if (equipments.id) {
      this.equipmentsService.update(102, equipments).subscribe(() => {
        this.activeModal.close('closed');
      })
    } else {
      this.equipmentsService.create(equipments).subscribe(() => {
        this.activeModal.close('closed');
      })
    }
  }

}
