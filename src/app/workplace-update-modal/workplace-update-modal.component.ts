import { Component, OnInit } from '@angular/core';
import { WorkplaceModel } from 'src/shared/models/WorkplaceModel';
import { Subscription } from 'rxjs';
import { WorkplaceUpdateModalService } from '../workplace-update-modal/workplace-update-modal.service';
import { WorkplaceService } from 'src/shared/services/workplace.service';
import { WorkplaceUploadEventService } from 'src/shared/services/workplace-upload-event.service';


@Component({
  selector: 'app-workplace-update-modal',
  templateUrl: './workplace-update-modal.component.html',
  styleUrls: ['./workplace-update-modal.component.scss']
})
export class WorkplaceUpdateModalComponent implements OnInit {

  subscription: Subscription;
  visible: Boolean = false;
  loading: Boolean = false;
  workplace: WorkplaceModel = new WorkplaceModel();

  constructor(private workplaceUpdateModalService: WorkplaceUpdateModalService, 
    private workplaceService: WorkplaceService, 
    private workplaceUploadEventService :WorkplaceUploadEventService ) 
    { }

  ngOnInit(): void {    
    // permet d'executer du code quand show() du service est appelé
    this.subscription = this.workplaceUpdateModalService.showEvent.subscribe(
      workplace => {
        this.show(workplace);
      }
    )
  }

 show(workplace: WorkplaceModel) {
  this.workplace = workplace;
  this.visible = true;
  this.loading = false;    
  }

  close() {
    this.visible = false;
  }

  async updateWorkplace(){
    this.loading = true;    
    await this.workplaceService.update(this.workplace);
    this.workplaceUploadEventService.workplacesUploaded()
    this.loading = false;
    this.close();
  }

}
