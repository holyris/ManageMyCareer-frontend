import { Component, OnInit } from '@angular/core';
import { FolderNode } from 'src/shared/models/FolderNode';
import { FolderListBreadcrumbCommunicationService } from 'src/shared/services/folder-list-breadcrumb-communication.service';
import { Subscription } from 'rxjs';
import { FolderTreeStoreService } from 'src/shared/services/folder-node-store.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  folderTreeStoreRefreshSubscription: Subscription;
  routerEventSubscription: Subscription;
  routeFolderNodes: FolderNode[] = [];
  constructor(
    private router: Router,
    private folderTreeStoreService: FolderTreeStoreService
  ) {
    //router subscribe doesn't correctly work in ngOnInit (too late)
    this.routerEventSubscription = this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.refresh();
    });
  }

  ngOnInit(): void {

    this.folderTreeStoreRefreshSubscription = this.folderTreeStoreService.getRefreshEvent.subscribe(
      () => {
        this.refresh();
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.folderTreeStoreRefreshSubscription.unsubscribe();
    this.routerEventSubscription.unsubscribe();
  }

  refresh() {
    this.routeFolderNodes = this.folderTreeStoreService.getRouteFolderNodes();
  }

  isLastOfRouteFolderNodes(index: number) {
    return index === this.routeFolderNodes.length - 1;
  }
}
