import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobourModalComponent } from './lobour-modal.component';

describe('LobourModalComponent', () => {
  let component: LobourModalComponent;
  let fixture: ComponentFixture<LobourModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobourModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobourModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
