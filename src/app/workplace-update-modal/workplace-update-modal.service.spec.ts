import { TestBed } from '@angular/core/testing';

import { WorkplaceUpdateModalService } from './workplace-update-modal.service';

describe('WorkplaceUpdateModalService', () => {
  let service: WorkplaceUpdateModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkplaceUpdateModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
