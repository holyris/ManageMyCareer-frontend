import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { UploaddialogComponent } from '../uploaddialog/uploaddialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: String;
  password: String;

  constructor(public userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  connect(){
    this.userService.connect(this.username, this.password);
  }

  openUpload() {
    const dialogRef = this.dialog.open(UploaddialogComponent, {
      width: '250px',
      data: {name: '', animal: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with '+result);
    });
  }
}
