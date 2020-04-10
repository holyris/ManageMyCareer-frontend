import { TestBed } from '@angular/core/testing';

import { FileUploadEventService } from './file-upload-event.service';

describe('FileUploadEventService', () => {
  let service: FileUploadEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
