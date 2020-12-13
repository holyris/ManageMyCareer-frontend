import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderService } from 'src/shared/services/folder.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { FolderNode } from 'src/shared/models/FolderNode';
import { Folder } from 'src/shared/models/Folder';
import { FileService } from 'src/shared/services/file.service';
import { FolderTreeStoreService } from 'src/shared/services/folder-node-store.service';

@Component({
  selector: 'app-move-modal',
  templateUrl: './move-modal.component.html',
  styleUrls: ['./move-modal.component.scss']
})
export class MoveModalComponent implements OnInit {

  // matTree objects are recreated because the expand states of this component must be isolated
  _transformer = (folder: Folder, level: number) => {
    return {
      id: folder.id,
      name: folder.name,
      expandable: !!folder.childFolders && folder.childFolders.length > 0,
      level: level
    };
  }

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.childFolders);

  treeControl = new FlatTreeControl<FolderNode>(
    node => node.level, node => node.expandable);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  loading: Boolean = false;
  form: FormGroup;
  initialFolderId: string = null;
  title: string = null;
  formControlName: string = null;


  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private folderService: FolderService,
    private fileService: FileService,
    private folderTreeStoreService: FolderTreeStoreService
  ) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.folderTreeStoreService.dataSource.data;

    if (this.injectedData.hasOwnProperty("parentFolderId")) {
      this.initialFolderId = this.injectedData.id
      this.title = "Déplacer un dossier";
      this.formControlName = "parentFolderId"
    } else if (Array.isArray(this.injectedData)) {
      this.title = "Déplacer des fichiers"
      this.formControlName = "folderId"
    } else {
      this.title = "Déplacer un fichier"
      this.formControlName = "folderId"
    }
    this.form = this.formBuilder.group({
      id: [this.injectedData.id],
      name: [this.injectedData.name],
      [this.formControlName]: [this.injectedData.parentFolderId]
    })
  }

  async submit() {
    this.loading = true;
    if (this.form.invalid) return;
    if (this.injectedData.hasOwnProperty("parentFolderId")) {
      await this.folderService.update(this.updatingItem)
    } else if (this.injectedData.hasOwnProperty("folderId")) {
      await this.fileService.update(this.updatingItem);
    }
    this.close();
    this.loading = false;
  }

  close() {
    this.dialog.closeAll();
  }

  isUpdatingItem = (_: number, _nodeData: FolderNode) => _nodeData.id === this.initialFolderId;

  get updatingItem() {
    return this.form.value;
  }

}
