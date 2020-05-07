import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { FileService } from 'src/shared/services/file.service';
import { FileModel } from 'src/shared/models/FileModel';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements ICellRendererAngularComp {
  params: any;
  label: string;
  file: FileModel = new FileModel();

  constructor(private personalFileService: FileService) {
  }

  agInit(params: any): void {
    this.params = params;
    this.file = this.params.data;

  }

  downloadFile(): void {
    this.personalFileService.download(this.file.id, this.file.name);
  }

  //Needed to implement ICellRendererAngularComp
  refresh(params?: any): boolean {
    return true;
  }

  async deleteFile() {
    if (this.params.refreshItems instanceof Function) {
      await this.personalFileService.delete(this.file.id)
      this.params.refreshItems()
    }
  }

  updateFile(): void {
    if (this.params.showUpdateModal instanceof Function) {
      this.params.showUpdateModal(this.file);
    }
  }
}
