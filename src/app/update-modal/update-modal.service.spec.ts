import { TestBed } from '@angular/core/testing';

import { UpdateModalService } from './update-modal.service';

describe('UpdateModalService', () => {
  let service: UpdateModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
