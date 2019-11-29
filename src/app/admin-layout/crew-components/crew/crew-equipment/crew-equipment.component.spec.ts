import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewEquipmentComponent } from './crew-equipment.component';

describe('CrewEquipmentComponent', () => {
  let component: CrewEquipmentComponent;
  let fixture: ComponentFixture<CrewEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
