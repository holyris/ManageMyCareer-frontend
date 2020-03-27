import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { PersonalFile } from '../PersonalFile';
import { ListeService } from '../service/liste.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  files: PersonalFile[];

  constructor(private personalFileService: ListeService) {

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
    {headerName: 'Id', field: 'id', sortable: true, filter: true},
    {headerName: 'File Name', field: 'fileName', sortable: true, filter: true},
    {headerName: 'File Type', field: 'fileType', sortable: true, filter: true},
    {headerName: 'Data', field: 'data', sortable: true, filter: true}
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
