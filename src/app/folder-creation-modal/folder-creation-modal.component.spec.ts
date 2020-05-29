import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderCreationModalComponent } from './folder-creation-modal.component';

describe('FolderCreationModalComponent', () => {
  let component: FolderCreationModalComponent;
  let fixture: ComponentFixture<FolderCreationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderCreationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
