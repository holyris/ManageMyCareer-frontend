import { TestBed } from '@angular/core/testing';

import { WorkplaceUploadEventService } from './workplace-upload-event.service';

describe('WorkplaceUploadEventService', () => {
  let service: WorkplaceUploadEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkplaceUploadEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
