import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {
  @ViewChild(UploadModalComponent) uploadModal: UploadModalComponent;
  uploadModalVisible: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  openUploadModal() {
    this.uploadModal.show();
  }

}
