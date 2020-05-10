import { TestBed } from '@angular/core/testing';

import { CompanyCreationModalService } from './company-creation-modal.service';

describe('CompanyCreationModalService', () => {
  let service: CompanyCreationModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyCreationModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
