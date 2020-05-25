import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkplaceUploadEventService {

    // Observable string sources
    private workplacesUploadedSubject = new Subject<string>();

    // Observable string streams
    getWorkplacesUploadedEvent = this.workplacesUploadedSubject.asObservable();
  
    constructor() { }
    
    // Service message commands
    workplacesUploaded(): any {
      console.log("coucou");
      
      this.workplacesUploadedSubject.next();
    }
}
