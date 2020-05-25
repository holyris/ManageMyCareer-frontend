import { TestBed } from '@angular/core/testing';

import { CompanyUploadEventService } from './company-upload-event.service';

describe('CompanyUploadEventService', () => {
  let service: CompanyUploadEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyUploadEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
