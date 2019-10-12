import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderModalComponent } from './tender-modal.component';

describe('TenderModalComponent', () => {
  let component: TenderModalComponent;
  let fixture: ComponentFixture<TenderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
