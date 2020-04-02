import { Component, OnInit } from '@angular/core';

import { PersonalFile } from '../../shared/models/PersonalFile';
import { FileService } from 'src/shared/services/file.service';

import { OperationsComponent } from "../operations/operations.component";

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  public columnDefs;
  public defaultColDef;

  files: PersonalFile[];

  constructor(private personalFileService: FileService) {
    this.columnDefs = [
      { headerName: 'Nom', field: 'name', sortable: true, filter: true, suppressMovable: true },
      { headerName: 'Type', field: 'type', sortable: true, filter: true, suppressMovable: true },
      { headerName: 'Taille', field: 'size', sortable: true, filter: true, suppressMovable: true },
      {
        headerName: '', field: 'operations', suppressMovable: true, cellStyle: { 'text-align': 'right' },
        cellRendererFramework: OperationsComponent
      },
    ];
    this.defaultColDef = { resizable: false };
  }

  ngOnInit(): void {
    this.getFiles();
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  getFiles(): void {
    this.personalFileService.getFiles()
      .subscribe(files => {
        this.files = files;
        console.log(files);
      });
  }
}
