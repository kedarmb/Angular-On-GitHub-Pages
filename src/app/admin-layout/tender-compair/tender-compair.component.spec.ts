import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderCompairComponent } from './tender-compair.component';

describe('TenderCompairComponent', () => {
  let component: TenderCompairComponent;
  let fixture: ComponentFixture<TenderCompairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderCompairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderCompairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
