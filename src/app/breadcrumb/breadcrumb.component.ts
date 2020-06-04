import { Component, OnInit } from '@angular/core';
import { FolderNode } from 'src/shared/models/FolderNode';
import { FolderListBreadcrumbCommunicationService } from 'src/shared/services/folder-list-breadcrumb-communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  folderListSubscription: Subscription;
  routeFolders: FolderNode[] = [];
  constructor(private folderListCommunication: FolderListBreadcrumbCommunicationService
  ) {
    this.folderListSubscription = this.folderListCommunication.getFolderChangedEvent.subscribe(data => {
      this.routeFolders = data;
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.folderListSubscription.unsubscribe();
  }

  isLastOfRouteFolders(index) {
    return index === this.routeFolders.length - 1;
  }
}
