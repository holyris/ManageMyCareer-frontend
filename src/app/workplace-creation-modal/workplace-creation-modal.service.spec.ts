import { TestBed } from '@angular/core/testing';

import { WorkplaceCreationModalService } from './workplace-creation-modal.service';

describe('WorkplaceCreationModalService', () => {
  let service: WorkplaceCreationModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkplaceCreationModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
