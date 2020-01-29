import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderBidComponent } from './tender-bid.component';

describe('TenderBidComponent', () => {
  let component: TenderBidComponent;
  let fixture: ComponentFixture<TenderBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
