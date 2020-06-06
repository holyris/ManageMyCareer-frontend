import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FileModel } from 'src/shared/models/FileModel';
import { FolderTreeStoreService } from 'src/shared/services/folder-node-store.service';
import { Subscription } from 'rxjs';
import { FolderNode } from 'src/shared/models/FolderNode';

@Component({
  selector: 'app-folder-cell',
  templateUrl: './folder-cell.component.html',
  styleUrls: ['./folder-cell.component.scss']
})
export class FolderCellComponent implements ICellRendererAngularComp {
  folderTreeStoreRefreshSubscription: Subscription;
  file: FileModel;
  folderName: string;
  folderRoute: string;
  folderNodeParents: FolderNode[];
  constructor(private folderTreeStoreService: FolderTreeStoreService
  ) { }

  agInit(params: any): void {
    this.file = params.data;
    this.update();
    this.folderTreeStoreRefreshSubscription = this.folderTreeStoreService.getRefreshEvent.subscribe(
      () => {
        this.update();
      });
  }

  ngOnDestroy() {
    this.folderTreeStoreRefreshSubscription.unsubscribe();
  }

  //interface's method
  refresh(params?: any): boolean {
    return true;
  }

  update() {
    let folderNode = this.folderTreeStoreService.getNodeById(this.file.folderId);
    this.folderName = folderNode ? folderNode.name : null;

    this.folderNodeParents = this.folderTreeStoreService.getAllParentNode(folderNode, [folderNode]);

    //get the route path of the current folder
    let parentNames = [];
    this.folderNodeParents.forEach(parent => {
      parentNames.push(parent.name);
    });
    this.folderRoute = parentNames.join("/");
  }

  expandAllParents() {
    this.folderNodeParents.forEach((parent, index) => {
      if (index !== this.folderNodeParents.length - 1)
        this.treeControl.expand(parent)
    });
  }

  get treeControl() {
    return this.folderTreeStoreService.treeControl;
  }
}
