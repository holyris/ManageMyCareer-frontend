import { Component, OnInit } from '@angular/core';

import { FileService } from 'src/shared/services/file.service';


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent {
  private params: any;

  private readonly baseUrl = "http://localhost:8080/file/";
  private fileId: string;
  private fileName: string;

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

  deleteFile(): void {
    this.personalFileService.deleteFile(this.fileId);
  }

  updateFile(): void {
    
  }
}
