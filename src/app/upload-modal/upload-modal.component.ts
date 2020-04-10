import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/shared/services/file.service';
import { DocumentType, EnumTypeValue } from 'src/shared/models/document-type.model';
import { FileModel } from 'src/shared/models/FileModel';
import { FileUploadEventService } from 'src/shared/services/file-upload-event.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
})
export class UploadModalComponent implements OnInit {
  @ViewChild('uploadFileComponent') uploadFileComponent: any;
  visible: Boolean;
  fileObjects: Array<FileModel>;
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

  constructor(public fileService: FileService, public fileUploadEventService: FileUploadEventService) { }

  ngOnInit() {

   }

  reset() {
    if (!this.visible) {
      this.fileObjects = [];
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

  async uploadFiles() {
    await this.fileService.upload(this.fileObjects)
    // .then(this.fileUploadEventService.filesUploaded());
    this.fileUploadEventService.filesUploaded()
    this.close();
  }

  addFiles(event) {
    this.fileObjects = [];
    for (let file of event.files) {
      this.fileObjects.push(new FileModel());
      this.fileObjects[this.fileObjects.length - 1].file = file;
    }
    this.uploadFileComponent.clear();
  }

  deleteFileObjectByIndex(index) {
    this.fileObjects.splice(index, 1);
  }

  isSelectedFichePaie(index) {
    return this.fileObjects[index].documentType && this.fileObjects[index].documentType.value === EnumTypeValue.FichePaie
  }

  isSelectedContrat(index) {
    return this.fileObjects[index].documentType && this.fileObjects[index].documentType.value === EnumTypeValue.Contrat
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



}
