import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderUpdateModalComponent } from './folder-update-modal.component';

describe('FolderUpdateModalComponent', () => {
  let component: FolderUpdateModalComponent;
  let fixture: ComponentFixture<FolderUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
