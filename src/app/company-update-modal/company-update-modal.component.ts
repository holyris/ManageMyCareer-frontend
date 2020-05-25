import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/shared/models/CompanyModel';
import { CompanyUpdateModalService } from './company-update-modal.service';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/shared/services/company.service';
import { CompanyUploadEventService } from 'src/shared/services/company-upload-event.service';

@Component({
  selector: 'app-company-update-modal',
  templateUrl: './company-update-modal.component.html',
  styleUrls: ['./company-update-modal.component.scss']
})
export class CompanyUpdateModalComponent implements OnInit {

  subscription: Subscription;
  visible: Boolean = false;
  loading: Boolean = false;
  company: CompanyModel = new CompanyModel();

  constructor(private companyUpdateModalService: CompanyUpdateModalService, 
    private companyService: CompanyService, 
    private companyUploadEventService :CompanyUploadEventService ) 
    { }

  ngOnInit(): void {    
    // permet d'executer du code quand show() du service est appelé
    this.subscription = this.companyUpdateModalService.showEvent.subscribe(
      company => {
        this.show(company);
      }
    )
  }

 show(company: CompanyModel) {
  this.company = company;
  this.visible = true;
  this.loading = false;    
  }

  close() {
    this.visible = false;
  }

  async updateCompany(){
    this.loading = true;    
    await this.companyService.update(this.company);
    this.companyUploadEventService.companiesUploaded()
    this.loading = false;
    this.close();
  }
}
