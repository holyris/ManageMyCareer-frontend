import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WorkplaceModel } from 'src/shared/models/WorkplaceModel';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceUpdateModalService {

  // Observable string sources
  private showSubject = new Subject<WorkplaceModel>();

  // Observable string streams
  showEvent = this.showSubject.asObservable();

  constructor() { }

  // Service message commands
  show(params: any = null): any {
    this.showSubject.next(params);
  }
}
