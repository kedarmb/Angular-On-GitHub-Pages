import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsModalComponent } from './equipments-modal.component';

describe('EquipmentsModalComponent', () => {
  let component: EquipmentsModalComponent;
  let fixture: ComponentFixture<EquipmentsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
