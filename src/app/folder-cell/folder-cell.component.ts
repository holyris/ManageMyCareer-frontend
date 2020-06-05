import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FileModel } from 'src/shared/models/FileModel';
import { FolderTreeStoreService } from 'src/shared/services/folder-node-store.service';
import { Subscription } from 'rxjs';

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

  ngOnDestroy(){
    this.folderTreeStoreRefreshSubscription.unsubscribe();
  }

  //interface's method
  refresh(params?: any): boolean {
    return true;
  }

  update() {
    let folderNode = this.folderTreeStoreService.getNodeById(this.file.folderId);
    this.folderName = folderNode ? folderNode.name : null;
    this.folderRoute = this.folderTreeStoreService.getFolderNodeRoute(folderNode);
  }

  stopPropagation(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }



}
