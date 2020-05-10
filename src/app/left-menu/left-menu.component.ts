import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';
import { UploadModalService } from '../upload-modal/upload-modal.service';
import { CompanyCreationModalService } from '../company-creation-modal/company-creation-modal.service';
import { WorkplaceCreationModalService } from '../workplace-creation-modal/workplace-creation-modal.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {

  constructor(
    private uploadModalService: UploadModalService,
    private companyCreationModalService: CompanyCreationModalService,
    private workplaceCreationModalService: WorkplaceCreationModalService
  ) { }

  ngOnInit(): void {
  }

  showFileUploadModal() {
    this.uploadModalService.show();
  }

  showCompanyCreationModal() {
    this.companyCreationModalService.show();
  }

  showWorkplaceCreationModal() {
    this.workplaceCreationModalService.show();
  };

}
