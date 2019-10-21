import { Component, OnInit } from '@angular/core';
import {CrewItem} from '../model/crew-item.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CrewItemService} from '../service/crew-item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Crew} from '../model/crew.model';
import {CrewService} from '../service/crew.service';

@Component({
  selector: 'app-create-crew',
  templateUrl: './create-crew.component.html',
  styleUrls: ['./create-crew.component.scss']
})
export class CreateCrewComponent implements OnInit {

  labours: CrewItem[];
  equipments: CrewItem[];
  crew: Crew;
  constructor( private crewItemService: CrewItemService, private activateRoute: ActivatedRoute, private router: Router, private crewService: CrewService) {
    this.activateRoute.params.subscribe((params) => {

      this.crew = JSON.parse(JSON.stringify(this.crewService.getCrewById(params['id']) || new Crew()));
    })
  }

  ngOnInit() {
    this.crewItemService.getAllEquipments().subscribe((equipments) => {
      this.equipments = equipments;
    })
    this.crewItemService.getAllLabour().subscribe((labours) => {
      this.labours = labours;
    })
  }

   isLabourChecked(labour) {
     const ifExists = this.crew.labours.find((crew) => {
       if (crew.id === labour.id) {
         return true;
       } else {
         return false;
       }
     })
     if (ifExists) {
       return true;
     } else {
       return false;
     }

   }

   isEquipmentChecked(equipment) {

     const ifExists = this.crew.equipments.find((item) => {
       if (item.id === equipment.id) {
         return true;
       } else {
         return false;
       }
     })

     if (ifExists) {
       return true;
     } else {
       return false;
     }
   }

   clickLabour(event, crewItem) {
    if (event.target.checked) {
      this.crew.labours.push(JSON.parse(JSON.stringify(crewItem)));
    } else {
      this.crew.labours = this.crew.labours.filter((labour) => {
             if (labour.id === crewItem.id) {
               return false;
             } else {
               return true;
             }
      })
    }


   }

   clickEquipment(event, crewItem) {
     if (event.target.checked) {
       this.crew.equipments.push(JSON.parse(JSON.stringify(crewItem)));
     } else {
       this.crew.equipments = this.crew.equipments.filter((equipment) => {
         if (equipment.id === crewItem.id) {
           return false;
         } else {
           return true;
         }
       })
     }
     console.log('********************************',this.crew.equipments);

   }

   cancel() {
     this.router.navigateByUrl('/crew');
   }
   save() {
    if (this.crew.id) {
      this.crewService.update(this.crew);
    } else {
      this.crewService.add(this.crew);
    }

       this.router.navigateByUrl('/crew');
   }


}