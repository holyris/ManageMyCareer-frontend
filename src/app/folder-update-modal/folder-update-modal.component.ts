import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FolderService } from 'src/shared/services/folder.service';

@Component({
  selector: 'app-folder-update-modal',
  templateUrl: './folder-update-modal.component.html',
  styleUrls: ['./folder-update-modal.component.scss']
})
export class FolderUpdateModalComponent implements OnInit {

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
    this.form = this.formBuilder.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      parentFolderId: [this.data.parentFolderId]
    })
  }

  async submit() {
    this.loading = true;
    if (this.form.invalid) return;
    await this.folderService.create(this.updatingFolder)
    this.loading = false;
    this.close();
  }

  close() {
    this.dialog.closeAll();
  }

  get updatingFolder() {
    return this.form.value;
  }


}
