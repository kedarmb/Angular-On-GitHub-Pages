import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourModalComponent } from './labour-modal.component';

describe('LabourModalComponent', () => {
  let component: LabourModalComponent;
  let fixture: ComponentFixture<LabourModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
