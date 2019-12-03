import { FormControl, FormArray, Validators } from '@angular/forms';
// import { Equipments } from 'app/shared/core/model/equipments.model';
import { HelperService } from 'app/shared/core/service/helper.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CrewItem } from '../../../shared/core/model/crew-item.model';
import { CrewItemService } from '../../../shared/core/service/crew-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Crew } from '../../../shared/core/model/crew.model';
import { CrewService } from '../../../shared/core/service/crew.service';
@Component({
  selector: 'app-create-crew',
  templateUrl: './create-crew.component.html',
  styleUrls: ['./create-crew.component.scss']
})
export class CreateCrewComponent implements OnInit {
  laboursData; // holds data from labours get api
  equipmentsData; // holds data from equipment get api
  crew: Crew;
  createCrewForm: FormGroup; // form variable
  newCrewData = {
    equipment: [],
    labour: []
  }
  constructor(private crewItemService: CrewItemService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private crewService: CrewService,
    private hs: HelperService,
    private formBuilder: FormBuilder) {
    this.hs.equipmentData.subscribe((response) => {
         this.equipmentsData = response
      }, error => {
        console.log(error);
      })
     this.hs.labourData.subscribe((response) => {
       this.laboursData = response;
       this.initCrewForm();
    }, error => {
      console.log(error);
    })
    this.activateRoute.params.subscribe((params) => {
      this.crew = JSON.parse(JSON.stringify(this.crewService.getCrewById(params['id']) || new Crew()));
    })
  }


  ngOnInit() {
    const j = this.laboursData.map((ev) => {
      return Object.assign({ _id: ev._id, name: ev.name })
    })
    this.newCrewData.labour.push(j);
    const k = this.equipmentsData.map((ev) => {
      return Object.assign({ _id: ev._id, name: ev.name })
    })
    this.newCrewData.equipment.push(k);

    // this.addCheckboxes()
    this.createFamousForArray()

  }
  initCrewForm() {
    this.createCrewForm = this.formBuilder.group({
      crewname: ['', [Validators.required]],
      crewdescription: ['', [Validators.required]],
      equipment: this.formBuilder.array([]),
      labour: this.formBuilder.array([]),
    });
  }
  createfields(): FormGroup {
    return this.formBuilder.group({
      _id: [],
      name: []
    })
  }

  createFamousForArray() {
    // const fg = this.newCrewData.labour.map(item => this.formBuilder.group(item));
    // const fa = this.formBuilder.array(fg);
    // this.createCrewForm.setControl('equipment', fa);
    // const fh = this.newCrewData.labour.map(item => this.formBuilder.group(item));
    // const fb = this.formBuilder.array(fh);
    // this.createCrewForm.setControl('labour', fb);
    // console.log(this.createCrewForm.controls);
  }

  updateChkbxArray(chk, isChecked, key) {
    const chkArray = <FormArray>this.createCrewForm.get(key);
    if (isChecked) {
      // sometimes inserts values already included creating double records for the same values -hence the defence
      if (chkArray.controls.findIndex(x => x.value === chk._id) === -1) {
        chkArray.push(new FormControl({ _id: chk._id, name: chk.name }));
        console.log(this.createCrewForm)
      }
    } else {
      const idx = chkArray.controls.findIndex(x => x.value === chk._id);
      chkArray.removeAt(idx);
      console.log(this.createCrewForm)
    }
  }

  // isLabourChecked(labour) {
  //   const ifExists = this.crew.labours.find((crew) => {
  //     if (crew.id === labour.id) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  //   if (ifExists) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // }

  // isEquipmentChecked(equipment) {

  //   const ifExists = this.crew.equipments.find((item) => {
  //     if (item.id === equipment.id) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })

  //   if (ifExists) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // clickLabour(event, crewItem) {
  //   if (event.target.checked) {
  //     this.crew.labours.push(JSON.parse(JSON.stringify(crewItem)));
  //   } else {
  //     this.crew.labours = this.crew.labours.filter((labour) => {
  //       if (labour.id === crewItem.id) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     })
  //   }


  // }

  // clickEquipment(event, crewItem) {
  //   if (event.target.checked) {
  //     this.crew.equipments.push(JSON.parse(JSON.stringify(crewItem)));
  //   } else {
  //     this.crew.equipments = this.crew.equipments.filter((equipment) => {
  //       if (equipment.id === crewItem.id) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     })
  //   }
  //   console.log('********************************', this.crew.equipments);

  // }

  cancel() {
    this.router.navigateByUrl('/crew');
  }
  save() {
    // if (this.crew.id) {
    //   this.crewService.update(this.crew);
    // } else {
    //   this.crewService.add(this.crew);
    // }

    // this.router.navigateByUrl('/crew');
  }


}
