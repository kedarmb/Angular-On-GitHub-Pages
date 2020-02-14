import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFastListComponent } from './tender-fast-list.component';

describe('TenderFastListComponent', () => {
  let component: TenderFastListComponent;
  let fixture: ComponentFixture<TenderFastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderFastListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderFastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
