import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';
import { UploadModalService } from '../upload-modal/upload-modal.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {

  constructor(private uploadModalService: UploadModalService) { }

  ngOnInit(): void {
  }
  
  openUploadModal() {
    this.uploadModalService.show();
  }

}
