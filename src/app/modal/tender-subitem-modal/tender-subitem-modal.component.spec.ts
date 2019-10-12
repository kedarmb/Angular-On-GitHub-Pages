import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderSubitemModalComponent } from './tender-subitem-modal.component';

describe('TenderSubitemModalComponent', () => {
  let component: TenderSubitemModalComponent;
  let fixture: ComponentFixture<TenderSubitemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderSubitemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderSubitemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
