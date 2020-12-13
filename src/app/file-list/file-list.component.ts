import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/shared/models/FileModel';
import { FileService } from 'src/shared/services/file.service';
import { Subscription } from 'rxjs';
import { GridApi } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { FileUpdateModalComponent } from '../file-update-modal/file-update-modal.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FolderService } from 'src/shared/services/folder.service';
import { MoveModalComponent } from '../move-modal/move-modal.component';
import { FolderCellComponent } from '../folder-cell/folder-cell.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { FilePreviewModalComponent } from '../file-preview-modal/file-preview-modal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  filter: string;
  menuTabs: Array<string> = ['filterMenuTab'];
  exportParams = {
    allColumns: false,
    columnKeys: ["name", "documentType", "company", "workplace", "documentMonth", "documentYear", "grossSalary", "netSalary"]
  };
  overlayNoRowsTemplate = `
                  <div>
                    <img height='110px' src='../assets/noRowsIcon.png'></img>
                    <h4 class="text-secondary pt-2">Déposez vos fichiers avec le bouton "Ajouter"</h4>
                  </div>
                  `;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private folderService: FolderService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
  ) {

    this.columnDefs = [
      { headerName: 'Document', field: 'name', tooltipField: 'name', suppressMenu: true, flex: 5 },
      { headerName: 'Type', field: 'documentType', tooltipField: 'documentType', flex: 3, hide: !this.isWeb },
      { headerName: 'Entreprise', field: 'company', tooltipField: 'company', flex: 3, hide: !this.isWeb },
      { headerName: 'Emploi', field: 'workplace', tooltipField: 'workplace', flex: 3, hide: !this.isWeb },
      { headerName: 'Date', field: 'documentDate', hide: !this.isWeb, valueFormatter: (params) => { return this.formatDate(params.value) } },
      // { headerName: 'Mois', field: 'documentMonth', flex: 2, hide: !this.isWeb },
      // { headerName: 'Année', field: 'documentYear', flex: 2, hide: !this.isWeb },
      { headerName: 'Salaire brut', field: 'grossSalary', hide: true },
      { headerName: 'Salaire net', field: 'netSalary', hide: true },
      {
        headerName: 'Dossier', sortable: false, suppressMenu: true, flex: 3, cellClass: "d-flex align-items-center", hide: !this.isWeb,
        cellRendererFramework: FolderCellComponent,
      },
    ];
    this.defaultColDef = { sortable: true, filter: true, suppressMovable: true, menuTabs: this.menuTabs, cellClass: "d-flex align-items-center border-right border-grey" };
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
    document.addEventListener("keydown", this.onKeyDown)

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.routeParamsSubscription.unsubscribe();
    this.dataSentSubscription.unsubscribe();
    this.folderDeleteSubscription.unsubscribe();
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  showUpdateModal(file: FileModel) {
    let dialogRef = this.dialog.open(FileUpdateModalComponent, { data: file })
    const sub: Subscription = dialogRef.componentInstance.submitted.subscribe((file) => {
      this.fileService.update(file);
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  showMoveModal(file: FileModel) {
    this.dialog.open(MoveModalComponent, { data: file });
  }

  showFilePreviewModal(file) {
    this.fileService.getBlob(file).subscribe(
      blob => {
        this.dialog.open(FilePreviewModalComponent, { data: { blob: blob }, minWidth: "100vw", maxWidth: "100vw", panelClass: 'preview-modal' });
      }
    )
  }

  downloadFile(file: FileModel): void {
    this.fileService.download(file);
  }

  async tryDeleteFiles(files: FileModel[]) {
    let dialogRef = this.dialog.open(DeleteModalComponent, { data: { items: files } })
    const sub: Subscription = dialogRef.componentInstance.onConfirm.subscribe(async (resolve) => {
      await this.deleteFiles(files);
      resolve();
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  async deleteFiles(files: FileModel[]) {
    await this.fileService.delete(files);
  }

  refresh() {
    this.files = [];
    if (this.folderIdRouteParam) {
      this.loadFilesByFolderId(this.folderIdRouteParam);
    } else {
      this.loadAllFiles();
    }
  }

  loadAllFiles() {
    if (this.gridApi) this.gridApi.showLoadingOverlay();
    this.fileService.getAll()
      .subscribe((files: FileModel[]) => {
        this.files = files;
        if (this.gridApi) this.gridApi.hideOverlay();
      });
  }

  loadFilesByFolderId(folderId: string): void {
    if (this.gridApi) this.gridApi.showLoadingOverlay();
    this.folderService.getFilesById(folderId).subscribe((files: FileModel[]) => {
      this.files = files;
      if (this.gridApi) this.gridApi.hideOverlay();

    })
  }

  rowDoubleClicked(event) {
    this.showFilePreviewModal(event.data);
  }

  rowRightClicked(event) {
    if (!event.node.isSelected()) {
      event.node.setSelected(true, true);
    }
  }

  exportAsCsv() {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv(this.exportParams);
    }
  }

  exportAsExcel() {
    if (this.gridApi) {
      this.gridApi.exportDataAsExcel(this.exportParams);
    }
  }

  onKeyDown = (event) => {
    if (event.key === "a" && event.ctrlKey) {
      event.preventDefault();
      this.gridApi.selectAllFiltered()
    }
  }

  getContextMenuItems = (params) => {
    if (params.node) {
      var file = params.node.data;
      if (this.gridApi.getSelectedRows().length <= 1) {
        return this.getSingleContextMenu(file);
      } else {
        return this.getMultipleContextMenu(this.gridApi.getSelectedRows())
      }
    }
  }

  private getSingleContextMenu(file) {
    return [
      {
        name: 'Aperçu',
        icon: `<i class="material-icons-outlined text-secondary">visibility</i>`,
        action: () => {
          this.showFilePreviewModal(file)
        }
      },
      {
        name: 'Modifier',
        icon: `<i class="material-icons-outlined text-secondary">create</i>`,
        action: () => {
          this.showUpdateModal(file)
        }
      },
      {
        name: 'Déplacer',
        icon: `<i class="material-icons-outlined text-secondary">low_priority</i>`,
        action: () => {
          this.showMoveModal(file)
        }
      },
      {
        name: 'Télécharger',
        icon: `<i class="material-icons-outlined text-secondary">save_alt</i>`,
        action: () => { this.downloadFile(file) }

      },
      {
        name: 'Supprimer',
        icon: `<i class="material-icons-outlined text-secondary">delete</i>`,
        action: () => { this.tryDeleteFiles(this.gridApi.getSelectedRows()) }

      },
    ];
  }

  private getMultipleContextMenu(files) {
    return [
      // {
      //   name: 'Déplacer',
      //   icon: `<i class="material-icons-outlined text-secondary">low_priority</i>`,
      //   action: () => {
      //     this.showMoveModal(files)
      //   }
      // },
      {
        name: 'Supprimer',
        icon: `<i class="material-icons-outlined text-secondary">delete</i>`,
        action: () => { this.tryDeleteFiles(files) }

      },
    ];
  }

  formatDate(date: Date): string {
    if (date) {
      return ('0' + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear()
    }
  }

  get isWeb() {
    return this.breakpointObserver.isMatched(Breakpoints.Web)
  }
}
