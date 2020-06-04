import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUpdateModalComponent } from './file-update-modal.component';

describe('UpdateModalComponent', () => {
  let component: FileUpdateModalComponent;
  let fixture: ComponentFixture<FileUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
