import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/shared/models/FileModel';
import { FileService } from 'src/shared/services/file.service';
import { Subscription } from 'rxjs';
import { FilePreviewModalService } from '../file-preview-modal/file-preview-modal.service';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { FileUpdateModalComponent } from '../file-update-modal/file-update-modal.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FolderService } from 'src/shared/services/folder.service';
import { MoveModalComponent } from '../move-modal/move-modal.component';
import { FolderCellComponent } from '../folder-cell/folder-cell.component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  public columnDefs;
  public defaultColDef;
  folderIdRouteParam: string;
  dataSentSubscription: Subscription;
  routeParamsSubscription: Subscription;
  folderDeleteSubscription: Subscription;
  gridApi: GridApi;
  files: FileModel[];
  menuTabs: Array<string> = ['filterMenuTab'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private folderService: FolderService,
    private filePreviewModalService: FilePreviewModalService,
    public dialog: MatDialog,
  ) {

    this.columnDefs = [
      { headerName: 'Nom', field: 'name', tooltipField: 'name', flex: 5 },
      { headerName: 'Type', field: 'documentType', tooltipField: 'documentType', flex: 3 },
      { headerName: 'Entreprise', field: 'company', tooltipField: 'company', flex: 3 },
      { headerName: 'Emploi', field: 'workplace', tooltipField: 'workplace', flex: 3 },
      { headerName: 'Mois', field: 'documentMonth', flex: 2 },
      { headerName: 'Année', field: 'documentYear', flex: 2 },
      {
        headerName: 'Dossier', sortable: false, suppressMenu: true, flex: 3,
        cellRendererFramework: FolderCellComponent,
      },
    ];
    this.defaultColDef = { sortable: true, filter: true, suppressMovable: true, menuTabs: this.menuTabs};
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.folderIdRouteParam = params.get('folderId');
      this.refresh();
    })

    this.dataSentSubscription = this.fileService.getDataSentEvent.subscribe(
      () => {
        this.refresh();
      }
    )
    this.folderDeleteSubscription = this.folderService.getDeleteEvent.subscribe(
      () => {
        this.refresh();
      }
    )
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.routeParamsSubscription.unsubscribe();
    this.dataSentSubscription.unsubscribe();
    this.folderDeleteSubscription.unsubscribe();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  showUpdateModal(file: FileModel) {
    this.dialog.open(FileUpdateModalComponent, { data: file, disableClose: true });
  }

  showMoveModal(file: FileModel) {
    this.dialog.open(MoveModalComponent, { data: file, disableClose: true });
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
  }

  refresh() {
    if (this.folderIdRouteParam) {
      this.loadFilesByFolderId(this.folderIdRouteParam);
    } else {
      this.loadAllFiles();
    }
  }

  loadAllFiles() {
    this.fileService.getAll()
      .subscribe((files: FileModel[]) => {
        this.files = files;
      });
  }

  loadFilesByFolderId(folderId: string): void {
    this.folderService.getFilesById(folderId).subscribe((files: FileModel[]) => {
      this.files = files;
    })
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
          icon: `<i class="material-icons-outlined">visibility</i>`,
          action: () => {
            this.showFilePreviewModal(file)
          }
        },
        {
          name: 'Modifier',
          icon: `<i class="material-icons-outlined">create</i>`,
          action: () => {
            this.showUpdateModal(file)
          }
        },
        {
          name: 'Déplacer',
          icon: `<i class="material-icons-outlined">low_priority</i>`,
          action: () => {
            this.showMoveModal(file)
          }
        },
        {
          name: 'Télécharger',
          icon: `<i class="material-icons-outlined">get_app</i>`,
          action: () => { this.downloadFile(file) }

        },
        {
          name: 'Supprimer',
          icon: `<i class="material-icons-outlined">delete</i>`,
          action: () => { this.deleteFiles(this.gridApi.getSelectedRows()) }

        },
      ];

      return result;
    }
  }
}
