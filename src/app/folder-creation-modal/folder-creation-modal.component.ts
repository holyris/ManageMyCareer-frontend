import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-folder-creation-modal',
  templateUrl: './folder-creation-modal.component.html',
  styleUrls: ['./folder-creation-modal.component.scss']
})
export class FolderCreationModalComponent implements OnInit {
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

  loading: Boolean = false;
  form: FormGroup;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.dataSource.data = data;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      parent: ['', Validators.required]

    })
  }

  submit() {
    this.close();
  }

  close() {
    this.dialog.closeAll();
  }

  hasChild(node: ExampleFlatNode) {
    return node.expandable;
  }

}
