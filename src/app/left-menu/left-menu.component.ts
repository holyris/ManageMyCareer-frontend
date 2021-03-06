import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadModalComponent } from '../file-upload-modal/file-upload-modal.component';
import { FolderCreationModalComponent } from '../folder-creation-modal/folder-creation-modal.component';
import { FolderService } from 'src/shared/services/folder.service';
import { FolderNode } from 'src/shared/models/FolderNode';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FolderUpdateModalComponent } from '../folder-update-modal/folder-update-modal.component';
import { MoveModalComponent } from '../move-modal/move-modal.component';
import { FolderTreeStoreService } from 'src/shared/services/folder-node-store.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private folderTreeStoreService: FolderTreeStoreService,
    private dialog: MatDialog,
    private folderService: FolderService,
    public breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.folderTreeStoreServiceRefresh();
  }

  folderTreeStoreServiceRefresh() {
    this.folderTreeStoreService.refresh();
  }

  showFileUploadModal(folderId: string = null) {
    this.dialog.open(FileUploadModalComponent, {
      data: { folderId: folderId }
    })
  }

  showFolderCreationModal(parentFolderId: string = null) {
    this.dialog.open(FolderCreationModalComponent, {
      data: { parentFolderId: parentFolderId }
    })
  }

  showFolderUpdateModal(node: FolderNode) {
    let parentNode = this.folderTreeStoreService.getParentNode(node);
    this.dialog.open(FolderUpdateModalComponent, {
      data: { id: node.id, name: node.name, parentFolderId: parentNode ? parentNode.id : null }
    })
  }

  showMoveModal(node: FolderNode) {
    const parentNode = this.folderTreeStoreService.getParentNode(node);

    this.dialog.open(MoveModalComponent, {
      data: { id: node.id, name: node.name, parentFolderId: parentNode ? parentNode.id : null }
    })
  }

  async tryDeleteFolder(folder) {
    let dialogRef = this.dialog.open(DeleteModalComponent, { data: { items: [folder] } })
    const sub: Subscription = dialogRef.componentInstance.onConfirm.subscribe(async (resolve) => {
      await this.deleteFolder(folder);
      resolve();
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  async deleteFolder(folder) {
    if (this.folderTreeStoreService.isActiveFolderNodeId(folder.id)) {
      let parentFolder = this.folderTreeStoreService.getParentNode(folder);
      if (parentFolder) {
        this.router.navigate(['/folders/' + parentFolder.id]);
      } else {
        this.router.navigate(['/files']);
      }
    }
    await this.folderService.delete(folder.id);
  }

  toggleNode(event, node) {
    this.stopPropagation(event);
    this.folderTreeStoreService.toggleNode(node);
  }

  isExpanded(node) {
    return this.treeControl.isExpanded(node);
  }

  collapseAll() {
    this.treeControl.collapseAll();
  }

  getRouteFolderId(): string {
    let route = this.router.url;
    if (route.includes("/folders/")) {
      return route.replace("/folders/", "");
    } else {
      return null;
    }
  }

  get dataSource() {
    return this.folderTreeStoreService.dataSource;
  }

  get treeControl() {
    return this.folderTreeStoreService.treeControl;
  }

  get isWeb() {
    return this.breakpointObserver.isMatched(Breakpoints.Web)
  }

  stopPropagation(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
