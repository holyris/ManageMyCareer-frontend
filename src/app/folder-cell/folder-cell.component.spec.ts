import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderCellComponent } from './folder-cell.component';

describe('FolderCellComponent', () => {
  let component: FolderCellComponent;
  let fixture: ComponentFixture<FolderCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
