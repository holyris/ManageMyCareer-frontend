import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  providers: [DialogService]
})
export class LeftMenuComponent implements OnInit {
  uploadModalVisible: Boolean = false;

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }


  openUploadModal() {
    const ref = this.dialogService.open(UploadModalComponent, {
      header:"Nouveau",
      footer:"caca"
    });

    ref.onClose.subscribe(() => {

    });
}

}
