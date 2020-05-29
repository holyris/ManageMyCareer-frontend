import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/shared/models/FileModel';
import { FileService } from 'src/shared/services/file.service';
import { Subscription } from 'rxjs';
import { FileUploadEventService } from 'src/shared/services/file-upload-event.service';
import { FilePreviewModalService } from '../file-preview-modal/file-preview-modal.service';
import { GridApi } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  public columnDefs;
  public defaultColDef;
  uploadSubscription: Subscription;
  gridApi: GridApi;
  files: FileModel[];
  menuTabs: Array<string> = ['filterMenuTab'];


  constructor(
    private fileService: FileService,
    private fileUploadEventService: FileUploadEventService,
    private filePreviewModalService: FilePreviewModalService,
    public dialog: MatDialog,
  ) {
    this.columnDefs = [
      { headerName: 'Nom', field: 'name', tooltipField: 'name' },
      { headerName: 'Type', field: 'documentType' },
      { headerName: 'Entreprise', field: 'company' },
      { headerName: 'Emploi', field: 'workplace' },
      { headerName: 'Date', field: 'documentDate', valueFormatter: (params) => { return this.formatDate(params.value) } }
    ];
    this.defaultColDef = { resizable: false, sortable: true, filter: true, suppressMovable: true, menuTabs: this.menuTabs };
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

  showUpdateModal(file: FileModel) {
    this.dialog.open(UpdateModalComponent, { data: file, disableClose: true });
  }

  showFilePreviewModal(file) {
    this.fileService.getBlob(file.id).subscribe(
      blob => {
        this.filePreviewModalService.show(blob)
      }
    )
  }

  downloadFile(file: FileModel): void {
    this.fileService.download(file.id, file.name);
  }

  async deleteFiles(files: FileModel[]) {
    await this.fileService.deleteMultiple(files);
    this.refreshItems();
  }

  refreshItems(): void {
    this.fileService.getAll()
      .subscribe((files: FileModel[]) => {
        this.files = files;
      });
  }

  rowDoubleClicked(event) {
    this.showUpdateModal(event.data);
  }

  rowRightClicked(event) {
    if (!event.node.isSelected()) {
      event.node.setSelected(true, true);
    }
  }

  formatDate(date: Date): string {
    if (date) {
      return ('0' + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear()
    }
  }

  getContextMenuItems = (params) => {
    if (params.node) {      
      var file = params.node.data;
      var result = [
        {
          name: 'Aperçu',
          icon: `<i class='fa fa-eye'></i>`,
          action: () => {
            this.showFilePreviewModal(file)
          }
        },
        'separator',
        {
          name: 'Modifier',
          icon: `<i class='fa fa-pen'></i>`,
          action: () => {
            this.showUpdateModal(file)
          }
        },
        'separator',
        {
          name: 'Télécharger',
          icon: `<i class='fa fa-download'></i>`,
          action: () => { this.downloadFile(file) }

        },
        'separator',
        {
          name: 'Supprimer',
          icon: `<i class='fa fa-trash'></i>`,
          action: () => { this.deleteFiles(this.gridApi.getSelectedRows()) }

        },
      ];

      return result;
    }
  }
}
