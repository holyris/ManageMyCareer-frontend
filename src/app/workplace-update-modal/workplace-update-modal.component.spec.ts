import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceUpdateModalComponent } from './workplace-update-modal.component';

describe('WorkplaceUpdateModalComponent', () => {
  let component: WorkplaceUpdateModalComponent;
  let fixture: ComponentFixture<WorkplaceUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkplaceUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
