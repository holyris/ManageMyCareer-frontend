import { Component, OnInit } from '@angular/core';

import { PersonalFile } from '../../shared/model/PersonalFile';
import { FileService } from 'src/shared/service/file.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  files: PersonalFile[];

  constructor(private personalFileService: FileService) {

  }

  ngOnInit(): void {
    //console.log(this.getFiles());
    this.getFiles();
  }

  getFiles(): void {
    this.personalFileService.getFiles()
      .subscribe(files => {
        this.files = files;
        //console.log(files);
      });
  }

  columnDefs = [
    {
      headerName: 'Nom', field: 'fileName', sortable: true, filter: true, suppressMovable: true
    },
    { headerName: 'Type', field: 'fileType', sortable: true, filter: true, suppressMovable: true },
    { headerName: 'Taille', field: 'fileSize', sortable: true, filter: true, suppressMovable: true },

  ];
  /*
  rowData = [
      { name: 'fichier1', type: 'pdf', size: 35000, lastModified: new Date() },
      { name: 'fichier2', type: 'png', size: 32000, lastModified: new Date() },
      { name: 'fichier3', type: 'mp4', size: 72000, lastModified: new Date() }
  ];
  */
  //rowData = this.getFiles();

}
