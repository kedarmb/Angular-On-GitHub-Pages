import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFastAttachComponent } from './tender-fast-attach.component';

describe('TenderFastAttachComponent', () => {
  let component: TenderFastAttachComponent;
  let fixture: ComponentFixture<TenderFastAttachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderFastAttachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderFastAttachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
