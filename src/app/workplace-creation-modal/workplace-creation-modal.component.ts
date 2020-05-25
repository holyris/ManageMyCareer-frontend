import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkplaceCreationModalService } from './workplace-creation-modal.service';
import { WorkplaceService } from 'src/shared/services/workplace.service';
import { WorkplaceModel } from 'src/shared/models/WorkplaceModel';
import { CompanyModel } from 'src/shared/models/CompanyModel';
import { CompanyService } from 'src/shared/services/company.service';
import { WorkplaceUpdateModalService } from '../workplace-update-modal/workplace-update-modal.service';
import { WorkplaceUploadEventService } from 'src/shared/services/workplace-upload-event.service';

@Component({
  selector: 'app-workplace-creation-modal',
  templateUrl: './workplace-creation-modal.component.html',
  styleUrls: ['./workplace-creation-modal.component.scss']
})
export class WorkplaceCreationModalComponent implements OnInit {

  subscription: Subscription;
  visible: Boolean = false;
  loading: Boolean = false;
  workplace: WorkplaceModel = new WorkplaceModel();
  companies: CompanyModel[];
  
  constructor(private workplaceCreationModalService: WorkplaceCreationModalService, private workplaceService : WorkplaceService, private companyService: CompanyService, private workplaceUploadEventService :WorkplaceUploadEventService) { }

  ngOnInit(): void {
    this.subscription = this.workplaceCreationModalService.showEvent.subscribe(
      () => {
        this.show();
      }
    )
  }

  show() {
    this.reset();
    this.visible = true
  }

  close() {
    this.visible = false;
  }

  reset(){
    this.getCompanies();
  }

  async createWorkplace(){
    this.loading = true;
    await this.workplaceService.create(this.workplace);
    this.workplaceUploadEventService.workplacesUploaded()
    this.loading = false;
    this.close();
  }

  getCompanies(){
    this.companyService.getAll().subscribe(data => {
      this.companies = data;
    })
  }

  companyChanged(event){
    this.workplace.companyId = event.value.id;
  }

}
