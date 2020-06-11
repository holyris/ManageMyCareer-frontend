import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {
  registerComponentVisible: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
