import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { FileService } from 'src/app/service/file.service';
import { DocumentType, EnumTypeValue } from 'src/shared/model/document-type.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userlabel: String;
  password: String;
  uploadModalVisible: Boolean;
  selectedDocumentType: DocumentType;
  selectedCompany: String;
  selectedJob: String;
  date: Date;
  selectedFile: File;
  filteredCompanies: any[];
  filteredJobs: any[];
  message: String;
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

  constructor(public fileService: FileService, public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  uploadFile() {
    this.fileService.upload(this.selectedFile);
  }

  openUploadDialog() {
    this.uploadModalVisible = true;
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

  test() {
    console.log(this.selectedFile);
  }
}
