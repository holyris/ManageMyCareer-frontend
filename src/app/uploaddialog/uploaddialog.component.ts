import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './uploaddialog.interface';

export interface Type {
  value: number;
  text: string;
}

@Component({
  selector: 'app-uploaddialog',
  templateUrl: './uploaddialog.component.html',
  styleUrls: ['./uploaddialog.component.scss']
})
export class UploaddialogComponent {
  label: string = "Type de document"
  types: Type[] = [
    {
      value: 0, text: 'Fiche de paie'
    },
    {
      value: 1, text: 'Contrat de travail'
    }, 
    {
      value: 2, text: 'CV'
    },
    {
      value: 3, text: 'Lettre'
    },
    {
      value: 4, text: 'Autre'
    },];

  constructor(
    public dialogRef: MatDialogRef<UploaddialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
