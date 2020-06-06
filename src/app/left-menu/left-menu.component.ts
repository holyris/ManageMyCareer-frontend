import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadModalComponent } from '../file-upload-modal/file-upload-modal.component';
import { FolderCreationModalComponent } from '../folder-creation-modal/folder-creation-modal.component';
import { FolderService } from 'src/shared/services/folder.service';
import { Folder } from 'src/shared/models/Folder';
import { FolderNode } from 'src/shared/models/FolderNode';
import { Router, NavigationStart, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { FolderUpdateModalComponent } from '../folder-update-modal/folder-update-modal.component';
import { MoveModalComponent } from '../move-modal/move-modal.component';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { FolderListBreadcrumbCommunicationService } from 'src/shared/services/folder-list-breadcrumb-communication.service';
import { FolderTreeStoreService } from 'src/shared/services/folder-node-store.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {

  // dataSentSubscription: Subscription;
  folderTreeStoreRefreshSubscription: Subscription

  constructor(
    private router: Router,
    private folderTreeStoreService: FolderTreeStoreService,
    private dialog: MatDialog,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private folderService: FolderService
  ) { }

  ngOnInit(): void {
    this.folderTreeStoreService.refresh();
    this.folderTreeStoreRefreshSubscription = this.folderTreeStoreService.getRefreshEvent.subscribe(
      () => {
        this.refresh();
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.folderTreeStoreRefreshSubscription.unsubscribe();
  }

  refresh() {
  }

  showFileUploadModal(folderId: string = null) {
    this.dialog.open(FileUploadModalComponent, {
      data: { folderId: folderId },
      disableClose: true
    })
  }

  showFolderCreationModal(parentFolderId: string = null) {
    this.dialog.open(FolderCreationModalComponent, {
      data: { parentFolderId: parentFolderId },
      disableClose: true
    })
  }

  showFolderUpdateModal(node: FolderNode) {
    let parentNode = this.folderTreeStoreService.getParentNode(node);
    this.dialog.open(FolderUpdateModalComponent, {
      data: { id: node.id, name: node.name, parentFolderId: parentNode ? parentNode.id : null },
      disableClose: true
    })
  }

  showMoveModal(node: FolderNode) {
    const parentNode = this.folderTreeStoreService.getParentNode(node);

    this.dialog.open(MoveModalComponent, {
      data: { id: node.id, name: node.name, parentFolderId: parentNode ? parentNode.id : null },
      disableClose: true
    })
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

  collapseAll(){
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

  stopPropagation(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
