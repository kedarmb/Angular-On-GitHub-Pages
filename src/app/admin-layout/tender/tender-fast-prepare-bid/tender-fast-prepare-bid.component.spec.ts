import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFastPrepareBidComponent } from './tender-fast-prepare-bid.component';

describe('TenderFastPrepareBidComponent', () => {
  let component: TenderFastPrepareBidComponent;
  let fixture: ComponentFixture<TenderFastPrepareBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderFastPrepareBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderFastPrepareBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
