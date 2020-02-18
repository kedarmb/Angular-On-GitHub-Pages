import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemCrewComponent } from './line-item-crew.component';

describe('LineItemCrewComponent', () => {
  let component: LineItemCrewComponent;
  let fixture: ComponentFixture<LineItemCrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineItemCrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
