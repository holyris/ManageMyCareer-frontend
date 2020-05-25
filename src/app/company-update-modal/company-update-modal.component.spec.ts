import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUpdateModalComponent } from './company-update-modal.component';

describe('CompanyUpdateModalComponent', () => {
  let component: CompanyUpdateModalComponent;
  let fixture: ComponentFixture<CompanyUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
