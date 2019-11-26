import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewModalComponent } from './crew-modal.component';

describe('CrewModalComponent', () => {
  let component: CrewModalComponent;
  let fixture: ComponentFixture<CrewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
