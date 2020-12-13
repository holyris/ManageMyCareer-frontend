import { Injectable } from '@angular/core';
import { Folder } from '../models/Folder';
import { FlatTreeControl } from '@angular/cdk/tree';
import { FolderNode } from '../models/FolderNode';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { FolderService } from './folder.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderTreeStoreService {

  private _transformer = (folder: Folder, level: number) => {
    return {
      id: folder.id,
      name: folder.name,
      expandable: !!folder.childFolders && folder.childFolders.length > 0,
      level: level
    };
  }

  public treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.childFolders);

  public treeControl = new FlatTreeControl<FolderNode>(
    node => node.level, node => node.expandable);

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  private expandedNodes: string[] = [];
  private activeFolderNode: FolderNode;

  private refreshSubject = new Subject<string>();
  public getRefreshEvent = this.refreshSubject.asObservable();

  constructor(
    private router: Router,
    private folderService: FolderService
  ) {
    // this.refresh();
    this.folderService.setFolderNodeStoreService(this)
    this.folderService.getDataSentEvent.subscribe(
      () => {
        this.refresh();
      }
    );
  }

  refresh() {
    this.storeExpandedNodes();
    this.folderService.getTree().subscribe(
      data => {
        this.dataSource.data = data;
        this.expandStoredNodes();
        this.alertRefresh();
      }
    );
  }

  toggleNode(node) {
    this.treeControl.toggle(node);
  }

  isExpanded(node): boolean {
    return this.treeControl.isExpanded(node);
  }

  findActiveFolderNode(): FolderNode {
    return this.getNodeById(this.getFolderIdRouteParam())
  }

  isActiveFolderNodeId(id: string): boolean {
    let activeFolderNode = this.findActiveFolderNode();
    if(activeFolderNode){
      return activeFolderNode.id === id;
    } else return false;
  }

  getNodeById(id: string): FolderNode {
    if (this.treeControl.dataNodes) {
      return this.treeControl.dataNodes.find(node => node.id === id)
    } else return null;
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
    if (!node) return [];
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

  getFolderIdRouteParam(): string {
    let folderIdRouteParam = this.router.url;
    if (folderIdRouteParam.includes("/folders/")) {
      return folderIdRouteParam.replace("/folders/", "");
    } else {
      return null;
    }
  }

  getRouteFolderNodes(): FolderNode[] {
    let activeFolderNode = this.findActiveFolderNode();
    return this.getAllParentNode(activeFolderNode, [activeFolderNode]);
  }

  alertRefresh() {
    this.refreshSubject.next();
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

  expandAllParents(node){
    let parents = this.getAllParentNode(node, [node])
    parents.forEach((parent, index) => {
      if (index !== parents.length - 1)
        this.treeControl.expand(parent)
    });
  }
}
