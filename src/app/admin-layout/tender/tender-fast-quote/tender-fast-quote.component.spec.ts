import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFastQuoteComponent } from './tender-fast-quote.component';

describe('TenderFastQuoteComponent', () => {
  let component: TenderFastQuoteComponent;
  let fixture: ComponentFixture<TenderFastQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderFastQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderFastQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
