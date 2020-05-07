import { Component, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { UpdateModalService } from './update-modal.service';
import { FileModel } from 'src/shared/models/FileModel';
import { SelectItem } from 'primeng/api/selectitem';
import { EnumTypeValue } from 'src/shared/models/EnumTypeValue.model';
import { FileService } from 'src/shared/services/file.service';

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

  constructor(private updateModalService: UpdateModalService, private fileService: FileService) { }

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

  reset(){
    this.loading = false;
  }

  async updateFile(){
    this.loading = true;
    await this.fileService.update(this.file);
    this.loading = false;
  }

  isFileFichePaie() {
    return this.file && this.file.documentType === EnumTypeValue.FichePaie
  }

  isFileContrat() {
    return this.file && this.file.documentType === EnumTypeValue.Contrat
  }
}
