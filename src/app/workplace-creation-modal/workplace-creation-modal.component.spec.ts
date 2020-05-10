import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceCreationModalComponent } from './workplace-creation-modal.component';

describe('WorkplaceCreationModalComponent', () => {
  let component: WorkplaceCreationModalComponent;
  let fixture: ComponentFixture<WorkplaceCreationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkplaceCreationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
