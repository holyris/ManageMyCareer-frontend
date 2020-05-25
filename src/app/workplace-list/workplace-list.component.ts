import { Component, OnInit } from '@angular/core';
import { WorkplaceService } from 'src/shared/services/workplace.service';
import { WorkplaceUploadEventService } from 'src/shared/services/workplace-upload-event.service';
import { WorkplaceUpdateModalService } from '../workplace-update-modal/workplace-update-modal.service';
import { WorkplaceModel } from 'src/shared/models/WorkplaceModel';
import { Subscription } from 'rxjs';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-workplace-list',
  templateUrl: './workplace-list.component.html',
  styleUrls: ['./workplace-list.component.scss']
})
export class WorkplaceListComponent implements OnInit {
  public columnDefs;
  public defaultColDef;
  workplaces: WorkplaceModel[];
  uploadSubscription: Subscription;
  gridApi: GridApi;

  constructor(private workplaceService: WorkplaceService, private workplaceUploadEventService: WorkplaceUploadEventService, private workplaceUpdateModalService: WorkplaceUpdateModalService) { 
    this.columnDefs = [
      { headerName: 'Nom', field: 'name', sortable: true, filter: true, suppressMovable: true, tooltipField: 'name' },
      { headerName: 'Description', field: 'description', sortable: true, filter: true, suppressMovable: true, tooltipField: 'description' }
    ];
    this.defaultColDef = { resizable: false };
  }

  ngOnInit(): void {
    this.refreshItems();
    console.log("1coucou");

    this.uploadSubscription = this.workplaceUploadEventService.getWorkplacesUploadedEvent.subscribe(
      () => {
        this.refreshItems();
      console.log("2coucou");

      }
    )
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.uploadSubscription.unsubscribe();
  }

  refreshItems(): void {
    this.workplaceService.getAll()
      .subscribe((workplaces: WorkplaceModel[]) => {
        this.workplaces = workplaces;
      });
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }

  rowRightClicked(event) {
    if (!event.node.isSelected()) {
      event.node.setSelected(true, true);
    }
  }

  showUpdateWorkplaceModal(workplace: WorkplaceModel) {
    this.workplaceUpdateModalService.show(workplace);
  }
  
  async deleteWorkplaces(workplaces: WorkplaceModel[]) {
    await this.workplaceService.deleteMultiple(workplaces);
    this.refreshItems();
  }

  getContextMenuItems = (params) => {
    if (params.node) {
      var workplace = params.node.data;
      var result = [
        {
          name: 'Modifier',
          icon: `<i class='fa fa-pen'></i>`,
          action: () => {
            this.showUpdateWorkplaceModal(workplace)
          }
        },
        'separator',
        {
          name: 'Supprimer',
          icon: `<i class='fa fa-trash'></i>`,
          action: () => { this.deleteWorkplaces(this.gridApi.getSelectedRows()) }

        },
      ];
      return result;
    }
  }

  

}
