import { TestBed } from '@angular/core/testing';

import { FolderTreeStoreService } from './folder-node-store.service';

describe('FolderNodeStoreService', () => {
  let service: FolderTreeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderTreeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
