import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Equipments from 'app/shared/core/model/equipments.model';
import { HttpService } from 'app/shared/core/service/http.service';

@Component({
  selector: 'app-equipments-modal',
  templateUrl: './equipments-modal.component.html',
  styleUrls: ['./equipments-modal.component.scss']
})
export class EquipmentsModalComponent implements OnInit {

  @Input('equipments')
  equipments: Equipments;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal, private httpService: HttpService) {}

  ngOnInit() {
  }

  close() {
    this.activeModal.close('closed');
  }
     save(equipments) {
    if (equipments.id) {
      this.httpService.updateEquipment(102, equipments).subscribe(() => {
        this.activeModal.close('closed');
      })
    } else {
      this.httpService.createEquipment(equipments).subscribe(() => {
        this.activeModal.close('closed');
      })
    }
  }

}
