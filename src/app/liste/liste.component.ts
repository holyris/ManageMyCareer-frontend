import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  columnDefs = [
      {headerName: 'Nom', field: 'nom', sortable: true, filter: true},
      {headerName: 'Type', field: 'type', sortable: true, filter: true},
      {headerName: 'Taille', field: 'taille', sortable: true, filter: true},
      {headerName: 'Modifié le', field: 'modifie_le', sortable: true, filter: true}
  ];

  rowData = [
      { nom: 'fichier1', type: 'pdf', taille: 35000, modifie_le: new Date() },
      { nom: 'fichier2', type: 'png', taille: 32000, modifie_le: new Date() },
      { nom: 'fichier3', type: 'mp4', taille: 72000, modifie_le: new Date() }
  ];

}
