import { Component, OnInit } from '@angular/core';
import { PersonalFile } from '../../shared/models/PersonalFile';
import { FileService } from 'src/shared/services/file.service';
import { Subscription } from 'rxjs';
import { OperationsComponent } from "../operations/operations.component";
import { FileUploadEventService } from 'src/shared/services/file-upload-event.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  public columnDefs;
  public defaultColDef;
  uploadSubscription: Subscription;

  files: PersonalFile[];

  constructor(private fileService: FileService, private fileUploadEventService: FileUploadEventService) {
    this.columnDefs = [
      { headerName: 'Nom', field: 'name', sortable: true, filter: true, suppressMovable: true },
      { headerName: 'Type', field: 'type', sortable: true, filter: true, suppressMovable: true },
      { headerName: 'Taille', field: 'size', sortable: true, filter: true, suppressMovable: true },
      {
        headerName: '', field: 'operations', suppressMovable: true, cellStyle: { 'text-align': 'right' },
        cellRendererFramework: OperationsComponent,
        cellRendererParams: {
          refreshItems: this.refreshItems.bind(this),
        }
      },
    ];
    this.defaultColDef = { resizable: false };
  }

  ngOnInit(): void {
    this.refreshItems();
    this.uploadSubscription = this.fileUploadEventService.getFilesUploadedEvent.subscribe(
      x => {
        this.refreshItems();
      }
    )
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.uploadSubscription.unsubscribe();
  }
  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  refreshItems(): void {
    this.fileService.getFiles()
      .subscribe(files => {
        this.files = files;
      });
  }
}
