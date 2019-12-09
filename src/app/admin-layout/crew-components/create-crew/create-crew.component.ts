import { FormControl, FormArray, Validators } from '@angular/forms';
import { HelperService } from 'app/shared/core/service/helper.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CrewItemService } from '../../../shared/core/service/crew-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Crew, Engineer } from '../../../shared/core/model/crew.model';
import { CrewService } from '../../../shared/core/service/crew.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';


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

  constructor(private crewItemService: CrewItemService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private crewService: CrewService,
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
      // this.addCheckboxes()
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
      this.chipSelectedEquipment.map((val) =>  {
        const a = Object.assign({_id: val._id})
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
      this.createCrewForm.setValue(this.chipSelectedLabour, {emitEvent: false});
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
      this.createCrewForm.setValue(this.chipSelectedLabour, {emitEvent: false});
    } else {
      //
      // Create a new engineer, assigning a new higher _Id
      // This is the use case when allowFreeTextAddEngineer is true
      //
      const highest_Id = Math.max(...this.chipSelectedEquipment.map(engineer => engineer._Id), 0);
      this.chipSelectedEquipment.push({ name: engineerName, _Id: highest_Id + 1 });
    }
  }

}
