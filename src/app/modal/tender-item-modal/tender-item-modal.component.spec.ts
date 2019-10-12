import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderItemModalComponent } from './tender-item-modal.component';

describe('TenderItemModalComponent', () => {
  let component: TenderItemModalComponent;
  let fixture: ComponentFixture<TenderItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
