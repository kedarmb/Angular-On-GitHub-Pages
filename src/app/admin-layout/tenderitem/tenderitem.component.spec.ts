import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderitemComponent } from './tenderitem.component';

describe('TenderitemComponent', () => {
  let component: TenderitemComponent;
  let fixture: ComponentFixture<TenderitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
