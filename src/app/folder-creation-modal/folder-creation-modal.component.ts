import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FolderService } from 'src/shared/services/folder.service';

@Component({
  selector: 'app-folder-creation-modal',
  templateUrl: './folder-creation-modal.component.html',
  styleUrls: ['./folder-creation-modal.component.scss']
})
export class FolderCreationModalComponent implements OnInit {
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
      name: ['', Validators.required],
      parentFolderId: [this.data.parentFolderId]
    })
  }

  submit() {
    this.loading=true;
    if (this.form.invalid) return;
    this.folderService.create(this.creatingFolder)
    this.close();
    this.loading=false;
  }

  close() {
    this.dialog.closeAll();
  }

  get creatingFolder() {
    return this.form.value;
  }

}
