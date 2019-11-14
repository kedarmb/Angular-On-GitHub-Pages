import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourAndEquipmentsComponent } from './labour-and-equipments.component';

describe('LabourAndEquipmentsComponent', () => {
  let component: LabourAndEquipmentsComponent;
  let fixture: ComponentFixture<LabourAndEquipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourAndEquipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourAndEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
