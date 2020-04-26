import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonalFile } from '../../shared/models/PersonalFile';
import { FileModel } from 'src/shared/models/FileModel';
import { FileService } from 'src/shared/services/file.service';
import { Subscription } from 'rxjs';
import { OperationsComponent } from "../operations/operations.component";
import { FileUploadEventService } from 'src/shared/services/file-upload-event.service';
import { FilePreviewModalComponent } from '../file-preview-modal/file-preview-modal.component';
import { FilePreviewModalService } from '../file-preview-modal/file-preview-modal.service';
import { GridApi, GridOptions, ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  @ViewChild(FilePreviewModalComponent) filePreviewModal: FilePreviewModalComponent;
  public columnDefs;
  public defaultColDef;
  uploadSubscription: Subscription;
  gridApi: GridApi;

  private rowSelection;

  gridOptions: GridOptions = {
  }

  files: FileModel[];

  constructor(private fileService: FileService, private fileUploadEventService: FileUploadEventService, private filePreviewModalService: FilePreviewModalService) {
    this.columnDefs = [
      { headerName: 'Nom', field: 'name', sortable: true, filter: true, suppressMovable: true, tooltipField: 'name' },
      { headerName: 'Type', field: 'documentType', sortable: true, filter: true, suppressMovable: true },
      { headerName: 'Entreprise', field: 'company', sortable: true, filter: true, suppressMovable: true },
      { headerName: 'Poste', field: 'workplace', sortable: true, filter: true, suppressMovable: true },
      { headerName: 'Date', field: 'documentDate', valueFormatter: (params) => { return this.documentDateFormatter(params.value) }, sortable: true, filter: true, suppressMovable: true },
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
      () => {
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
    this.gridApi = params.api;
  }

  refreshItems(): void {
    this.fileService.getFiles()
      .subscribe((files: FileModel[]) => {
        this.files = files;
      });
  }

  rowDoubleClicked(event) {
    this.fileService.getBlobById(event.data.id).subscribe(
      blob => {
        this.filePreviewModalService.show(blob)
      }
    )
  }

  documentDateFormatter(date): String {
    if (date) {
      return ('0' + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear()
    }
  }
  onClickPrintSelection() {
    let rows = this.gridApi.getSelectedRows();

    console.log("select row = ", rows);
  }
}
