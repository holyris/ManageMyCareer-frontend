import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/shared/services/file.service';
import { EnumTypeValue } from 'src/shared/models/EnumTypeValue.model';
import { SelectItem } from 'primeng/api';
import { FileModel } from 'src/shared/models/FileModel';
import { FileUploadEventService } from 'src/shared/services/file-upload-event.service';
import { Subscription } from 'rxjs';
import { UploadModalService } from './upload-modal.service';

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
  subscription: Subscription;
  
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

  companies: SelectItem[] = [
    {
      label: "Actads",
      value: "Actads"
    },
    {
      label: "test",
      value: "test"
    },
  ];
  
  workplaces: SelectItem[] = [
    {
      label: "Developpeur",
      value: "Developpeur"
    },
    {
      label: "Manager",
      value: "Manager"
    },
  ]

  constructor(public fileService: FileService, public fileUploadEventService: FileUploadEventService, private uploadModalService: UploadModalService) { }

  ngOnInit() {
    // permet d'executer du code quand show() du service est appelé
    this.subscription = this.uploadModalService.showEvent.subscribe(
      () => {
        this.show();
      }
    )
   }

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
    console.log(index)
    console.log(this.fileObjects);
    this.fileObjects.splice(index, 1);
    console.log(this.fileObjects);
  }

  isSelectedFichePaie(index) {
    return this.fileObjects[index].isFichePaie()
  }

  isSelectedContrat(index) {
    return this.fileObjects[index].isContrat();
  }

  // filterCompanies(event) {
  //   let filtered: any[] = [];
  //   for (let i = 0; i < this.companies.length; i++) {
  //     let company = this.companies[i];
  //     if (company.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
  //       filtered.push(company);
  //     }
  //   }
  //   this.filteredCompanies = filtered;
  // }

  // filterJobs(event) {
  //   let filtered: any[] = [];
  //   for (let i = 0; i < this.jobs.length; i++) {
  //     let company = this.jobs[i];
  //     if (company.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
  //       filtered.push(company);
  //     }
  //   }
  //   this.filteredJobs = filtered;
  // }



}
