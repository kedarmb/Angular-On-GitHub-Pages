import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTendersComponent } from './active-tenders.component';

describe('ActiveTendersComponent', () => {
  let component: ActiveTendersComponent;
  let fixture: ComponentFixture<ActiveTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
