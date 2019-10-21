import { Component, OnInit } from '@angular/core';
import {NgbMarkDisabled} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import {CrewModalComponent} from '../modal/crew-modal/crew-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Crew} from '../model/crew.model';
import {CrewService} from '../service/crew.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit {

   crews: Crew[];
  constructor(private modalService: NgbModal, private crewService: CrewService, private router: Router) { }

  ngOnInit() {
     this.crewService.getAll().subscribe((crews) => {
       this.crews = crews;
     })
  }


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

}
