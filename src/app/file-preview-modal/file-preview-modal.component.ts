import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-file-preview-modal',
  templateUrl: './file-preview-modal.component.html',
  styleUrls: ['./file-preview-modal.component.scss']
})
export class FilePreviewModalComponent implements OnInit {
  data: string;


  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any
  ) { }

  ngOnInit(): void {
    this.data = window.URL.createObjectURL(this.injectedData.blob);
  }

}
