import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FileUploadModalComponent } from '../file-upload-modal/file-upload-modal.component';
import { FolderCreationModalComponent } from '../folder-creation-modal/folder-creation-modal.component';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  showFileUploadModal(folderId: string = null) {
    this.dialog.open(FileUploadModalComponent, {
      data: { folderId: folderId }
    })
  }

  showFolderCreationModal(parentFolderId: string = null) {
    this.dialog.open(FolderCreationModalComponent, {
      data: { parentFolderId: parentFolderId }
    })
  }

  getRouteFolderId(): string {
    let route = this.router.url;
    if (route.includes("/folders/")) {
      return route.replace("/folders/", "");
    } else {
      return null;
    }
  }

}
