import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewLabourComponent } from './crew-labour.component';

describe('CrewLabourComponent', () => {
  let component: CrewLabourComponent;
  let fixture: ComponentFixture<CrewLabourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewLabourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewLabourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
