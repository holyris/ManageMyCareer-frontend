import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilePreviewModalService } from './file-preview-modal.service';


@Component({
  selector: 'app-file-preview-modal',
  templateUrl: './file-preview-modal.component.html',
  styleUrls: ['./file-preview-modal.component.scss']
})
export class FilePreviewModalComponent implements OnInit {
  subscription: Subscription;
  visible: Boolean = false;
  data: string;
  

  constructor(private filePreviewModalService: FilePreviewModalService) { }

  ngOnInit(): void {
    // permet d'executer du code quand show() du service est appelé
    this.subscription = this.filePreviewModalService.showEvent.subscribe(
      (blob) => {
        this.show(blob);
      }
    )
  }

  show(blob) {
    this.data = window.URL.createObjectURL(blob);
    this.visible = true;
  }

}
