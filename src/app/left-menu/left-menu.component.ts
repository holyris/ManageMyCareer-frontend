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

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {

  private _transformer = (folder: Folder, level: number) => {
    return {
      id: folder.id,
      name: folder.name,
      expandable: !!folder.childFolders && folder.childFolders.length > 0,
      level: level
    };
  }

  treeControl = new FlatTreeControl<FolderNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.childFolders);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  selectedFolderId: string = null;
  expandedNodes: string[] = [];
  dataSentSubscription: Subscription;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private breadCrumbCommunication: FolderListBreadcrumbCommunicationService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private folderService: FolderService
  ) {
  }

  ngOnInit(): void {
    this.refresh();
    this.dataSentSubscription = this.folderService.getDataSentEvent.subscribe(
      () => {
        this.refresh();
      }
    );

    //listen route change
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.sendActiveNodeParents();
    })
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.dataSentSubscription.unsubscribe();
  }

  refresh() {
    this.storeExpandedNodes();
    this.folderService.getTree().subscribe(
      data => {
        this.dataSource.data = data;
        this.expandStoredNodes();
        this.setListItemContentPadding();
        this.sendActiveNodeParents();
      }
    );
  }

  sendActiveNodeParents() {
    let activeNode = this.findActiveFolderNode();
    let parents = [];
    if (activeNode) {
      parents = this.getAllParentNode(activeNode, [activeNode])
    }
    this.breadCrumbCommunication.alertFolderChanged(parents);
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
    this.dialog.open(FolderUpdateModalComponent, {
      data: { id: node.id, name: node.name },
      disableClose: true
    })
  }

  showMoveModal(node: FolderNode) {
    const parentNode = this.getParentNode(node);

    this.dialog.open(MoveModalComponent, {
      data: { id: node.id, name: node.name, parentFolderId: parentNode ? parentNode.id : null },
      disableClose: true
    })
  }

  async deleteFolder(folder) {
    await this.folderService.delete(folder.id);
    if (this.getRouteFolderId() !== folder.id) return;

    let parentFolder = this.getParentNode(folder);
    if (parentFolder) {
      this.router.navigate(['/folders/' + parentFolder.id]);
    } else {
      this.router.navigate(['/files']);
    }
  }

  toggleNode(event, node) {
    this.stopPropagation(event);
    this.treeControl.toggle(node);
    this.setListItemContentPadding();
  }

  findActiveFolderNode(): FolderNode {
    return this.getNodeById(this.getRouteFolderId())
  }

  getNodeById(id: string): FolderNode {
    if (this.treeControl.dataNodes) {
      return this.treeControl.dataNodes.find(node => node.id === id)
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: FolderNode): FolderNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  //store all parents in parents
  getAllParentNode(node: FolderNode, parents: FolderNode[]): FolderNode[] {
    if (!node) return parents;
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return parents;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        parents.unshift(currentNode);
        return this.getAllParentNode(currentNode, parents);
      }
    }
    return parents;
  }

  getRouteFolderId(): string {
    let route = this.router.url;
    if (route.includes("/folders/")) {
      return route.replace("/folders/", "");
    } else {
      return null;
    }
  }

  storeExpandedNodes() {
    if (this.treeControl.dataNodes) {
      this.expandedNodes = [];
      this.treeControl.dataNodes.forEach(node => {
        if (this.treeControl.isExpanded(node)) {
          this.expandedNodes.push(node.id);
        }
      });
    }
  }

  expandStoredNodes() {
    if (this.treeControl.dataNodes) {
      this.treeControl.dataNodes.forEach(node => {
        if (this.expandedNodes.includes(node.id)) {
          this.treeControl.expand(node);
        }
      });
    }
  }

  setListItemContentPadding() {
    const listItems = this.elementRef.nativeElement.querySelectorAll('.mat-list-item-content') as HTMLElement[];
    listItems.forEach(listItem => {
      this.renderer.setStyle(listItem, 'padding', '0px');
    });
  }

  stopPropagation(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
