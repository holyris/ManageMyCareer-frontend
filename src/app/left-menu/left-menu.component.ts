import { Component, OnInit, ViewChild } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  providers: [DialogService]
})
export class LeftMenuComponent implements OnInit {
  @ViewChild(UploadModalComponent) uploadModal: UploadModalComponent;
  uploadModalVisible: Boolean = false;

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }


  openUploadModal() {
    this.uploadModal.show();
    // const ref = this.dialogService.open(UploadModalComponent, {

    // });

    // ref.onClose.subscribe(() => {

    // })

    
}

}
