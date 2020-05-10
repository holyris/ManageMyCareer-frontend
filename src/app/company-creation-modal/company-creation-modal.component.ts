import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyCreationModalService } from './company-creation-modal.service';
import { CompanyService } from 'src/shared/services/company.service';
import { CompanyModel } from 'src/shared/models/CompanyModel';

@Component({
  selector: 'app-company-creation-modal',
  templateUrl: './company-creation-modal.component.html',
  styleUrls: ['./company-creation-modal.component.scss']
})
export class CompanyCreationModalComponent implements OnInit {
  subscription: Subscription;
  visible: Boolean = false;
  loading: Boolean = false;
  company: CompanyModel = new CompanyModel();
  constructor(private companyCreationModalService: CompanyCreationModalService, private companyService : CompanyService) { }

  ngOnInit(): void {
    this.subscription = this.companyCreationModalService.showEvent.subscribe(
      () => {
        this.show();
      }
    )
  }

  show() {
    this.visible = true
  }

  close() {
    this.visible = false;
  }

  reset(){}

  async createCompany(){
    this.loading = true;
    await this.companyService.create(this.company);
    this.loading = false;
    this.close();
  }

}
