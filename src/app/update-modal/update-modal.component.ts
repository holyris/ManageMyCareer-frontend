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

  constructor() { }

  ngOnInit(): void {
  }

}
