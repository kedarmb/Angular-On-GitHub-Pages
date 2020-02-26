import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderReviewComponent } from './tender-review.component';

describe('TenderReviewComponent', () => {
  let component: TenderReviewComponent;
  let fixture: ComponentFixture<TenderReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
