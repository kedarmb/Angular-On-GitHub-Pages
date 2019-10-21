import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifySubcontractorComponent } from './notify-subcontractor.component';

describe('NotifySubcontractorComponent', () => {
  let component: NotifySubcontractorComponent;
  let fixture: ComponentFixture<NotifySubcontractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifySubcontractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifySubcontractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
