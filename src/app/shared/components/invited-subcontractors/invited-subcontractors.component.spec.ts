import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedSubcontractorsComponent } from './invited-subcontractors.component';

describe('InvitedSubcontractorsComponent', () => {
  let component: InvitedSubcontractorsComponent;
  let fixture: ComponentFixture<InvitedSubcontractorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedSubcontractorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedSubcontractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
