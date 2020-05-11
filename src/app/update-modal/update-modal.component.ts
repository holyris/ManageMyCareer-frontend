import { Component, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { UpdateModalService } from './update-modal.service';
import { FileModel } from 'src/shared/models/FileModel';
import { SelectItem } from 'primeng/api/selectitem';
import { EnumTypeValue } from 'src/shared/models/EnumTypeValue.model';
import { FileService } from 'src/shared/services/file.service';
import { FileUploadEventService } from 'src/shared/services/file-upload-event.service';
import { CompanyService } from 'src/shared/services/company.service';
import { WorkplaceService } from 'src/shared/services/workplace.service';
import { CompanyModel } from 'src/shared/models/CompanyModel';
import { WorkplaceModel } from 'src/shared/models/WorkplaceModel';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  subscription: Subscription;
  visible: Boolean = false;
  loading: Boolean = false;
  file: FileModel = new FileModel();
  companies: CompanyModel[];
  workplaces: WorkplaceModel[];
  selectedCompany: CompanyModel;
  selectedWorkplace: WorkplaceModel;

  types: SelectItem[] = [
    {
      label: EnumTypeValue.FichePaie,
      value: EnumTypeValue.FichePaie
    },
    {
      label: EnumTypeValue.Contrat,
      value: EnumTypeValue.Contrat
    },
    {
      label: EnumTypeValue.Cv,
      value: EnumTypeValue.Cv
    },
    {
      label: EnumTypeValue.Lettre,
      value: EnumTypeValue.Lettre
    },
    {
      label: EnumTypeValue.Autre,
      value: EnumTypeValue.Autre
    }
  ];

  constructor(
    private updateModalService: UpdateModalService, 
    private fileService: FileService, 
    private fileUploadEventService: FileUploadEventService, 
    private companyService: CompanyService,
    private workplaceService: WorkplaceService
    ) { }

  ngOnInit(): void {    
    // permet d'executer du code quand show() du service est appelé
    this.subscription = this.updateModalService.showEvent.subscribe(
      file => {
        this.show(file);
      }
    )
  }

  show(file: FileModel) {
    this.reset();
    this.file = file;
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  private reset(){
    this.getCompanies();
    this.getWorkplaces();
    this.loading = false;    
  }

  async updateFile(){
    this.loading = true;    
    await this.fileService.update(this.file);
    this.fileUploadEventService.filesUploaded()
    this.loading = false;
    this.close();
  }

  private getCompanies() {
    this.companyService.getAll().subscribe(data => {
      this.companies = data;            
    })
  }

  private getWorkplaces() {
    this.workplaceService.getAll().subscribe(data => {
      this.workplaces = data;
    })
  }

  companyChanged(event){
    this.file.company = event.value.name;
  }

  workplaceChanged(event){
    this.file.workplace = event.value.name;
  }

  isFileFichePaie() {
    return this.file && this.file.isFichePaie();
  }

  isFileContrat() {
    return this.file && this.file.isContrat();
  }
}
