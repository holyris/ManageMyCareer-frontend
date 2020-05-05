import { Component, OnInit, ViewChild } from '@angular/core';

import { PersonalFile } from 'src/shared/models/PersonalFile';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  @ViewChild('updateFileComponent') updateFileComponent: any;
  PersonalFile: any;
  visible: Boolean = false;
  loading: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.visible = true;
    console.log("modal visible");
  }

  close() {
    this.visible = false;
  }

  async updateFiles() {
    /*
    this.loading = true;
    await this.fileService.upload(this.fileObjects)
    this.fileUploadEventService.filesUploaded()
    this.loading = false;

    this.close();
    */
  }

}
