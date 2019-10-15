import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenchModalComponent } from './trench-modal.component';

describe('TrenchModalComponent', () => {
  let component: TrenchModalComponent;
  let fixture: ComponentFixture<TrenchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrenchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
