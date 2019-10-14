import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTenderComponent } from './view-tender.component';

describe('ViewTenderComponent', () => {
  let component: ViewTenderComponent;
  let fixture: ComponentFixture<ViewTenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
