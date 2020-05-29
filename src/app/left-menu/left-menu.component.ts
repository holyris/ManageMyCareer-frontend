import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';
import { FolderCreationModalComponent } from '../folder-creation-modal/folder-creation-modal.component';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Fruit loops' },
    ]
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli' },
          { name: 'Brussels sprouts' },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins' },
          { name: 'Carrots' },
        ]
      },
    ]
  },
  { name: "Casserole" }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
  }

  //impossible to change by another way
  ngAfterViewInit(): void {
    this.setListItemContentPadding();
  }

  showFileUploadModal() {
    this.dialog.open(UploadModalComponent, { disableClose: true })
  }

  showFolderCreationModal() {
    this.dialog.open(FolderCreationModalComponent, { data: TREE_DATA, disableClose: true, minHeight:"0%"})
  }

  deleteNode(node) {
    console.log(node);
    console.log(this.treeFlattener.getChildren(node));
  }

  toggleNode(event, node) {
    this.stopPropagation(event);
    this.treeControl.toggle(node);
    this.setListItemContentPadding();
  }

  hasChild(node: ExampleFlatNode) {
    return node.expandable;
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
