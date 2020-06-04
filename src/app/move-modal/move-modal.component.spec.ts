import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveModalComponent } from './move-modal.component';

describe('MoveModalComponent', () => {
  let component: MoveModalComponent;
  let fixture: ComponentFixture<MoveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
