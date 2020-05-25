import { TestBed } from '@angular/core/testing';

import { CompanyUpdateModalService } from './company-update-modal.service';

describe('CompanyUpdateModalService', () => {
  let service: CompanyUpdateModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyUpdateModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
