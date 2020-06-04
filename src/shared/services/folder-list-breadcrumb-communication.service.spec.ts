import { TestBed } from '@angular/core/testing';

import { FolderListBreadcrumbCommunicationService } from './folder-list-breadcrumb-communication.service';

describe('FolderListBreadcrumbCommunicationService', () => {
  let service: FolderListBreadcrumbCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderListBreadcrumbCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
