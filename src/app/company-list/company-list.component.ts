import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/shared/services/company.service';
import { CompanyUploadEventService } from 'src/shared/services/company-upload-event.service';
import { CompanyUpdateModalService } from '../company-update-modal/company-update-modal.service';
import { CompanyModel } from 'src/shared/models/CompanyModel';
import { Subscription } from 'rxjs';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  public columnDefs;
  public defaultColDef;
  companies: CompanyModel[];
  uploadSubscription: Subscription;
  gridApi: GridApi;

  constructor(private companyService: CompanyService, private companyUploadEventService: CompanyUploadEventService, private companyUpdateModalService: CompanyUpdateModalService) { 
    this.columnDefs = [
      { headerName: 'Nom', field: 'name', sortable: true, filter: true, suppressMovable: true, tooltipField: 'name' },
      { headerName: 'Description', field: 'description', sortable: true, filter: true, suppressMovable: true, tooltipField: 'description' }
    ];
    this.defaultColDef = { resizable: false };
  }

  ngOnInit(): void {
    this.refreshItems();
    this.uploadSubscription = this.companyUploadEventService.getCompaniesUploadedEvent.subscribe(
      () => {
        this.refreshItems();
      }
    )
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.uploadSubscription.unsubscribe();
  }

  refreshItems(): void {
    this.companyService.getAll()
      .subscribe((companies: CompanyModel[]) => {
        this.companies = companies;
      });
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }

  rowRightClicked(event) {
    if (!event.node.isSelected()) {
      event.node.setSelected(true, true);
    }
  }

  showUpdateCompanyModal(company: CompanyModel) {
    this.companyUpdateModalService.show(company);
  }
  
  async deleteCompanies(companies: CompanyModel[]) {
    await this.companyService.deleteMultiple(companies);
    this.refreshItems();
  }

  getContextMenuItems = (params) => {
    if (params.node) {
      var company = params.node.data;
      var result = [
        {
          name: 'Modifier',
          icon: `<i class='fa fa-pen'></i>`,
          action: () => {
            this.showUpdateCompanyModal(company)
          }
        },
        'separator',
        {
          name: 'Supprimer',
          icon: `<i class='fa fa-trash'></i>`,
          action: () => { this.deleteCompanies(this.gridApi.getSelectedRows()) }

        },
      ];
      return result;
    }
  }


}
