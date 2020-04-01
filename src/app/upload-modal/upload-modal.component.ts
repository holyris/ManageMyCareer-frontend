import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/shared/services/file.service';
import { DocumentType, EnumTypeValue } from 'src/shared/models/document-type.model';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
})
export class UploadModalComponent implements OnInit {
  @ViewChild('uploadFileComponent') uploadFileComponent: any;
  visible: Boolean;
  selectedDocumentType: DocumentType;
  selectedCompany: String;
  selectedJob: String;
  date: Date;
  selectedFile: File;
  filteredCompanies: any[];
  filteredJobs: any[];
  uploadingSpinner: Boolean = false;

  companies: String[] = [
    "Entreprise", "manage", "career", "test", "acta", "isir"
  ];
  jobs: String[] = [
    "Developpeur ", "admin reseau", "croquette"
  ];

  types: DocumentType[] = [
    {
      value: EnumTypeValue.FichePaie, label: 'Fiche de paie'
    },
    {
      value: EnumTypeValue.Contrat, label: 'Contrat de travail'
    },
    {
      value: EnumTypeValue.Cv, label: 'CV'
    },
    {
      value: EnumTypeValue.Lettre, label: 'Lettre'
    },
    {
      value: EnumTypeValue.Autre, label: 'Autre'
    },];

  constructor(public fileService: FileService) { }

  ngOnInit() {

  }

  reset() {
    if (!this.visible) {
      this.selectedCompany = null;
      this.selectedDocumentType = null;
      this.selectedJob = null;
      this.uploadFileComponent.clear();
    }
  }

  show() {
    this.reset();
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  uploadFile() {
    this.fileService.upload(this.selectedFile);
    this.close();
  }

  addFile(event) {
    this.selectedFile = event.files[0];
  }

  filterCompanies(event) {
    let filtered: any[] = [];
    for (let i = 0; i < this.companies.length; i++) {
      let company = this.companies[i];
      if (company.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        filtered.push(company);
      }
    }
    this.filteredCompanies = filtered;
  }


  filterJobs(event) {
    let filtered: any[] = [];
    for (let i = 0; i < this.jobs.length; i++) {
      let company = this.jobs[i];
      if (company.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        filtered.push(company);
      }
    }
    this.filteredJobs = filtered;
  }

  isSelectedFichePaie() {
    return this.selectedDocumentType && this.selectedDocumentType.value === EnumTypeValue.FichePaie
  }

  isSelectedContrat() {
    return this.selectedDocumentType && this.selectedDocumentType.value === EnumTypeValue.Contrat
  }

}
