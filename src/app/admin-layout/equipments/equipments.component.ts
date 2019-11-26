import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentsService } from 'app/shared/core/service/equipments.service';
import { Router } from '@angular/router';
import { EquipmentsModalComponent } from '../../shared/components/equipments-modal/equipments-modal.component';
import Equipments from 'app/shared/core/model/equipments.model';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {

  equipments: Array<any>;

    ngOnInit() {
        this.equipmentsService.getAll().subscribe((data) => {
            this.equipments = data['data'];
        })
    }

    constructor(private modalService: NgbModal, private equipmentsService: EquipmentsService, private router: Router) {
    }

    delete(equipments) {
        this.equipmentsService.delete(equipments).subscribe(() => {
            this.equipmentsService.getAll().subscribe((equipments) => {
                //this.equipments = equipments;
            })
        })
    }

    open(item?) {
        const modalRef = this.modalService.open(EquipmentsModalComponent, {centered: true});
        const obj = {};
        for (const i in item) {
            obj[i] = item[i];
        }
        modalRef.componentInstance.equipments = obj || new Equipments();
        modalRef.result.then(() => {
            this.equipmentsService.getAll().subscribe((equipments) => {
                console.log('.>>>>>>>>>>>>>>>>>>>>>>>>>', equipments);
                //this.equipments = equipments;
            });
        })
    }

    viewTender() {
        this.router.navigateByUrl('view-tender');
    }

}
