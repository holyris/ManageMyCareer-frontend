import { TestBed } from '@angular/core/testing';

import { UploadModalService } from './upload-modal.service';

describe('UploadModalService', () => {
  let service: UploadModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
