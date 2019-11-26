import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CrewItemService} from '../../../service/crew-item.service';
import {CrewItem} from '../../../model/crew-item.model';


@Component({
  selector: 'app-crew-modal',
  templateUrl: './crew-modal.component.html',
  styleUrls: ['./crew-modal.component.scss']
})
export class CrewModalComponent implements OnInit {

  
   labours: CrewItem[];
   equipments: CrewItem[];
  constructor(private activeModal: NgbActiveModal, private crewItemService: CrewItemService) { }

  ngOnInit() {
    this.crewItemService.getAllEquipments().subscribe((equipments) => {
       this.equipments = equipments;
    })
    this.crewItemService.getAllLabour().subscribe((labours) => {
      this.labours = labours;
    })
  }

  close() {
    this.activeModal.close('');
  }

}
