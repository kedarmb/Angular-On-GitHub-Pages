import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderCompareComponent } from './tender-compare.component';

describe('TenderCompareComponent', () => {
  let component: TenderCompareComponent;
  let fixture: ComponentFixture<TenderCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
