import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFastMatchComponent } from './tender-fast-match.component';

describe('TenderFastMatchComponent', () => {
  let component: TenderFastMatchComponent;
  let fixture: ComponentFixture<TenderFastMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderFastMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderFastMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
