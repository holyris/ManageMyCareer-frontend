import { TestBed } from '@angular/core/testing';

import { WorkplaceService } from './workplace.service';

describe('WorkplaceService', () => {
  let service: WorkplaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkplaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
