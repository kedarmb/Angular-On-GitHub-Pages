import { HttpService } from 'app/shared/core/service/http.service';
import { CrewEquipmentComponent } from './crew-equipment/crew-equipment.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbMarkDisabled } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { CrewModalComponent } from '../../../shared/components/crew-modal/crew-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Crew, Engineer } from '../../../shared/core/model/crew.model';
import { CrewService } from '../../../shared/core/service/crew.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipmentsModalComponent } from 'app/shared/components/equipments-modal/equipments-modal.component';
import { LabourModalComponent } from 'app/shared/components/labour-modal/labour-modal.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { FormControl, FormArray, Validators } from '@angular/forms';
import { HelperService } from 'app/shared/core/service/helper.service';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CrewItemService } from '../../../shared/core/service/crew-item.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Crew, Engineer } from '../../../shared/core/model/crew.model';
// import { CrewService } from '../../../shared/core/service/crew.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0s ease-in')
      ]),
      transition(':leave', [
        animate('0s ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class CrewComponent implements OnInit {

  laboursData; // holds data from labours get api
  equipmentsData; // holds data from equipment get api
  crew: Crew;
  createCrewForm: FormGroup; // form variable

  public chipSelectedLabour: Engineer[] = [];
  public chipSelectedEquipment: any = [];
  public filteredEquipment: Observable<String[]>;
  public filteredLabour: Observable<String[]>;

  //
  // Set this to false to ensure engineers are from allEngineers list only.
  // Set this to true to also allow 'free text' engineers.
  //
  private allowFreeTextAddEngineer = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('Eauto', { static: false }) matEAutocomplete: MatAutocomplete;
  @ViewChild('Lauto', { static: false }) matLAutocomplete: MatAutocomplete;
  @ViewChild('EquipmentInput', { static: false }) EquipmentInput: ElementRef<HTMLInputElement>;
  @ViewChild('LabourInput', { static: false }) LabourInput: ElementRef<HTMLInputElement>;



  crews: Crew[];
  httpService: any;
  organizationForm: any;
  activeModal: any;
  valueChange: any;
  currentState = 'initial';
  public show = false;
  public buttonName = 'Show';

  constructor(private modalService: NgbModal, private crewService: CrewService, private router: Router,
    private crewItemService: CrewItemService,
    private activateRoute: ActivatedRoute,
    private hs: HelperService,
    private formBuilder: FormBuilder) {
    this.hs.equipmentData.subscribe((response) => {
      this.equipmentsData = response
    }, error => {
      // console.log(error);
    })
    this.hs.labourData.subscribe((response) => {
      this.laboursData = response;
    }, error => {
      // console.log(error)
    })
    this.activateRoute.params.subscribe((params) => {
      this.crew = JSON.parse(JSON.stringify(this.crewService.getCrewById(params['id']) || new Crew()));
    })
    }

  ngOnInit() {
    this.initCrewForm();
      this.filteredEquipment = this.createCrewForm.get('equipment').valueChanges.pipe(
        startWith(null),
        map(equipment => this.hs.filterOnValueChange(equipment, this.equipmentsData, this.chipSelectedEquipment)));

        this.filteredLabour = this.createCrewForm.get('labour').valueChanges.pipe(
          startWith(null),
          map(labour => this.hs.filterOnValueChange(labour, this.laboursData, this.chipSelectedLabour)))
  }
  initCrewForm() {
    this.createCrewForm = this.formBuilder.group({
      crewname: ['', [Validators.required]],
      crewdescription: ['', [Validators.required]],
      equipment: this.formBuilder.control([]),
      labour: this.formBuilder.control([]),
    });
  }

  cancel() {
    this.router.navigateByUrl('/crew');
  }
  save() {
    this.createCrewForm.controls.equipment.setValue(this.chipSelectedEquipment)
    this.createCrewForm.controls.labour.setValue(this.chipSelectedLabour)
    // console.log(this.createCrewForm)
    this.chipSelectedEquipment.map((val) => {
      const a = Object.assign({ _id: val._id })
      const b = Object.values(a)
      return b
    })

  }

  public addLabour(event: MatChipInputEvent): void {
    if (!this.allowFreeTextAddEngineer) {
      // only allowed to select from the filtered autocomplete list
      // console.log('allowFreeTextAddEngineer is false');
      return;
    }

    //
    // Only add when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    //
    if (this.matLAutocomplete.isOpen) {
      return;
    }

    // Add our engineer
    const value = event.value;
    // console.log(event.value)
    if ((value || '').trim()) {
      this.selectLabourByName(value.trim());
    }
    // console.log(this.createCrewForm)
    this.resetInputs(this.LabourInput, this.createCrewForm.controls.labour);
  }
  public addEquipment(event: MatChipInputEvent): void {
    if (!this.allowFreeTextAddEngineer) {
      // only allowed to select from the filtered autocomplete list
      // console.log('allowFreeTextAddEngineer is false');
      return;
    }

    //
    // Only add when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    //
    if (this.matEAutocomplete.isOpen) {
      return;
    }

    // Add our engineer
    const value = event.value;
    if ((value || '').trim()) {
      this.selectEquipmentByName(value.trim());
    }
    // console.log(this.createCrewForm)
    this.resetInputs(this.EquipmentInput, this.createCrewForm.controls.equipment);
  }
  public removeLabour(engineer: Engineer): void {
    const index = this.chipSelectedLabour.indexOf(engineer);
    if (index >= 0) {
      this.chipSelectedLabour.splice(index, 1);
      this.resetInputs(this.LabourInput, this.createCrewForm.controls.labour);
    }
  }
  public removeEquipment(engineer: Engineer): void {
    const index = this.chipSelectedEquipment.indexOf(engineer);
    if (index >= 0) {
      this.chipSelectedEquipment.splice(index, 1);
      this.resetInputs(this.EquipmentInput, this.createCrewForm.controls.equipment);
    }
  }
  public equipmentSelected(event: MatAutocompleteSelectedEvent): void {
    // console.log(event)
    this.selectEquipmentByName(event.option.value);
    // this.resetInputs(this.EquipmentInput, this.createCrewForm.controls.equipment);
  }
  public labourSelected(event: MatAutocompleteSelectedEvent): void {
    // console.log(event)
    this.selectLabourByName(event.option.value);
    this.resetInputs(this.LabourInput, this.createCrewForm.controls.labour);
  }
  private resetInputs(elCtrl, inputCtrl) {
    // clear input element
    elCtrl.nativeElement.value = '';
    // clear control value and trigger engineerControl.valueChanges event 
    inputCtrl.setValue(null);
  }

  private selectLabourByName(engineerName) {
    const foundEngineer = this.laboursData.filter(engineer => {
      // console.log(engineer)
      return engineer.name == engineerName
    });
    // console.log(foundEngineer)
    // console.log(engineerName)
    if (foundEngineer.length) {
      //
      // We found the engineer name in the allEngineers list
      //
      this.chipSelectedLabour.push(foundEngineer[0]);
      this.createCrewForm.setValue(this.chipSelectedLabour, { emitEvent: false });
    } else {
      //
      // Create a new engineer, assigning a new higher _Id
      // This is the use case when allowFreeTextAddEngineer is true
      //
      const highest_Id = Math.max(...this.chipSelectedLabour.map(engineer => engineer._Id), 0);
      this.chipSelectedLabour.push({ name: engineerName, _Id: highest_Id + 1 });
      // console.log(this.chipSelectedLabour);
    }
  }

  private selectEquipmentByName(engineerName) {
    const foundEngineer = this.equipmentsData.filter(engineer => {
      // console.log(engineer)
      return engineer.name == engineerName
    });
    if (foundEngineer.length) {
      //
      // We found the engineer name in the allEngineers list
      //
      this.chipSelectedEquipment.push(foundEngineer[0]);
      this.createCrewForm.setValue(this.chipSelectedLabour, { emitEvent: false });
    } else {
      //
      // Create a new engineer, assigning a new higher _Id
      // This is the use case when allowFreeTextAddEngineer is true
      //
      const highest_Id = Math.max(...this.chipSelectedEquipment.map(engineer => engineer._Id), 0);
      this.chipSelectedEquipment.push({ name: engineerName, _Id: highest_Id + 1 });
    }
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) {
      this.buttonName = 'Hide';
    } else {
      this.buttonName = 'Show';
    }
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }
  getCrewData() {
    this.httpService.labour(this.organizationForm.value).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.activeModal.close('closed');
          this.valueChange.emit(response.status);
        }
      },
      error => {
        console.log(error);
      }
    )
  };

  open(crew?) {
    const modalRef = this.modalService.open(CrewModalComponent, { centered: true, size: 'lg' });
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



// 
//
//
//