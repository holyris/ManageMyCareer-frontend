import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { UploaddialogComponent } from '../uploaddialog/uploaddialog.component';
import {DialogService} from 'primeng/dynamicdialog';

export interface Type {
  value: number;
  text: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: String;
  password: String;
  uploadModalVisible: Boolean;

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

  constructor(public userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  connect(){
    this.userService.connect(this.username, this.password);
  }

  openUpload(){
    this.uploadModalVisible = true;
  //   const ref = this.dialogService.open(uploadmodal, {
  //     header: 'Choose a Car',
  //     width: '70%'
  // });

  }

  // openUpload() {
  //   const dialogRef = this.dialog.open(UploaddialogComponent, {
  //     width: '250px',
  //     data: {name: '', animal: ''}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed with '+result);
  //   });
  // }
}
