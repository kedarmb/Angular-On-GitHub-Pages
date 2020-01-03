import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderItemComponent } from './tender-item.component';

describe('TenderItemComponent', () => {
  let component: TenderItemComponent;
  let fixture: ComponentFixture<TenderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
