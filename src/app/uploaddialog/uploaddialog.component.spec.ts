import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaddialogComponent } from './uploaddialog.component';

describe('UploaddialogComponent', () => {
  let component: UploaddialogComponent;
  let fixture: ComponentFixture<UploaddialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaddialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
