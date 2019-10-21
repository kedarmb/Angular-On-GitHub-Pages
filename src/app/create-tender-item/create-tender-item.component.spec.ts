import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTenderItemComponent } from './create-tender-item.component';

describe('CreateTenderItemComponent', () => {
  let component: CreateTenderItemComponent;
  let fixture: ComponentFixture<CreateTenderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTenderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTenderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
