import { TestBed } from '@angular/core/testing';

import { FilePreviewModalService } from './file-preview-modal.service';

describe('FilePreviewModalService', () => {
  let service: FilePreviewModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilePreviewModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
