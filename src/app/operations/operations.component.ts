import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { FileService } from 'src/shared/services/file.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements ICellRendererAngularComp {
  params: any;
  label: String;
  fileId: string;
  fileName: string;

  constructor(private personalFileService: FileService) {
  }

  agInit(params: any): void {
    this.params = params;

    this.fileId = this.params.data.id;
    this.fileName = this.params.data.name;
  }

  downloadFile(): void {
    this.personalFileService.downloadFile(this.fileId, this.fileName);
  }

  filePreview(): void {
    this.personalFileService.filePreview(this.fileId);
  }

  refresh(params?: any): boolean {
    return true;
  }

  async deleteFile($event) {
    if (this.params.deleteFile instanceof Function) {
      await this.personalFileService.deleteFile(this.fileId);
      await this.params.deleteFile();
    }
  }

  updateFile(): void {

  }

  // exemple
  // onClick($event) {
  //   if (this.params.onClick instanceof Function) {
  //     // put anything into params u want pass into parents component
  //     const params = {
  //       event: $event,
  //       rowData: this.params.node.data
  //       // ...something
  //     }
  //     this.params.onClick(params);

  //   }
  // }
}
