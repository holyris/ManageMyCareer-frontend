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
  loading: Boolean = false;


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

  ngOnInit() { }

  reset() {
    if (!this.visible) {
      this.loading = false;
      this.fileObjects = [];      
      this.uploadFileComponent.clear(); //Reset le composant d'upload
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
    this.loading = true;
    await this.fileService.upload(this.fileObjects)
    this.fileUploadEventService.filesUploaded()
    this.loading = false;

    this.close();
  }

  addFiles(event) {
    this.fileObjects = [];  //Reset la liste des fichiers 
    for (let file of event.files) {
      let fileObject = new FileModel();
      fileObject.name = file.name;
      fileObject.size = file.size;
      fileObject.type = file.type;

      let reader = new FileReader();
      //appelle cette fonction quand readAsArrayBuffer est fini
      reader.onload = function (e) {
        // converti reader.result en base64
        fileObject.fileContent = btoa(
          new Uint8Array(reader.result as ArrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }
      //prend le blob et le converti en tableau binaire dans reader.result
      reader.readAsArrayBuffer(file);
      this.fileObjects.push(fileObject);
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
