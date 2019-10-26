import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalComprehendComponent } from './medical-comprehend.component';

describe('MedicalComprehendComponent', () => {
  let component: MedicalComprehendComponent;
  let fixture: ComponentFixture<MedicalComprehendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalComprehendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalComprehendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
