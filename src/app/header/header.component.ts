import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DocumentType, EnumTypeValue } from 'src/shared/model/document-type.model';

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
  uploadedFile: any;
  filteredCompanies: any[];
  filteredJobs: any[];

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

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  connect() {
    this.userService.connect(this.userlabel, this.password);
  }

  openUpload() {
    this.uploadModalVisible = true;
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFile.push(file);
    }
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
    console.log(this.selectedDocumentType);
  }

}
