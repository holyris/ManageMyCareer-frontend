import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCreationModalComponent } from './company-creation-modal.component';

describe('CompanyCreationModalComponent', () => {
  let component: CompanyCreationModalComponent;
  let fixture: ComponentFixture<CompanyCreationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCreationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
