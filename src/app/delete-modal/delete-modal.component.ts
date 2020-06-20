import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Output() onConfirm = new EventEmitter();
  loading: Boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

  async confirm() {
    this.loading = true;
    await new Promise(resolve => this.onConfirm.emit(resolve));
    this.close();
  }

  close() {
    this.dialog.closeAll();
  }

}
