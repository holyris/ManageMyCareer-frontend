import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Folder } from 'src/shared/models/Folder';
import { FolderService } from 'src/shared/services/folder.service';
import { FolderNode } from 'src/shared/models/FolderNode';

@Component({
  selector: 'app-folder-update-modal',
  templateUrl: './folder-update-modal.component.html',
  styleUrls: ['./folder-update-modal.component.scss']
})
export class FolderUpdateModalComponent implements OnInit {
  private _transformer = (node: Folder, level: number) => {
    return {
      id: node.id,
      expandable: !!node.childFolders && node.childFolders.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FolderNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.childFolders);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  loading: Boolean = false;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private folderService: FolderService
  ) {
  }

  ngOnInit(): void {
    this.folderService.getTree().subscribe(data => {
      this.dataSource.data = data;
    })
    this.form = this.formBuilder.group({
      id: [this.data.id, Validators.required],
      name: [this.data.name, Validators.required],
      parentFolderId: [this.data.parentFolderId]
    })
  }

  submit() {
    if (this.form.invalid) return;
    this.folderService.create(this.updatingFolder)
    this.close();
  }

  close() {
    this.dialog.closeAll();
  }

  isUpdatingFolder(node: FolderNode) {
    return node.id === this.updatingFolder.id;
  }

  get updatingFolder() {
    return this.form.value;
  }


}
