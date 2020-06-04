import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderService } from 'src/shared/services/folder.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { FolderNode } from 'src/shared/models/FolderNode';
import { Folder } from 'src/shared/models/Folder';
import { FileService } from 'src/shared/services/file.service';
import { FileModel } from 'src/shared/models/FileModel';

@Component({
  selector: 'app-move-modal',
  templateUrl: './move-modal.component.html',
  styleUrls: ['./move-modal.component.scss']
})
export class MoveModalComponent implements OnInit {

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
  initialFolderId: string = null;
  modifyingFolderId: string = null;
  titleItem: string = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private folderService: FolderService,
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this.folderService.getTree().subscribe(data => {
      this.dataSource.data = data;
    })
    if (this.injectedData.hasOwnProperty("parentFolderId")) {
      this.modifyingFolderId = this.injectedData.parentFolderId;
      this.initialFolderId = this.injectedData.id
      this.titleItem = "dossier";
    } else {
      this.titleItem = "fichier"
    }
    this.form = this.formBuilder.group({
      id: [this.injectedData.id, Validators.required],
      folderId: [this.modifyingFolderId]
    })
  }

  async submit() {
    this.loading = true;
    if (this.form.invalid) return;
    if (this.injectedData.hasOwnProperty("parentFolderId")) {
      await this.folderService.create(this.updatingItem)
    } else if (this.injectedData.hasOwnProperty("folderId")) {
      await this.fileService.update(this.updatingItem);
    }
    this.loading = false;
    this.close();
  }

  close() {
    this.dialog.closeAll();
  }

  isUpdatingItem(node: FolderNode) {
    return node.id === this.initialFolderId;
  }

  get updatingItem() {
    return this.form.value;
  }

}
