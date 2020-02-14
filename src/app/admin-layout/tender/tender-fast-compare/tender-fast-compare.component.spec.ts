import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFastCompareComponent } from './tender-fast-compare.component';

describe('TenderFastCompareComponent', () => {
  let component: TenderFastCompareComponent;
  let fixture: ComponentFixture<TenderFastCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderFastCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderFastCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
