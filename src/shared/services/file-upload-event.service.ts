import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadEventService {

  // Observable string sources
  private filesUploadedSubject = new Subject<string>();

  // Observable string streams
  getFilesUploadedEvent = this.filesUploadedSubject.asObservable();

  constructor() { }
  
  // Service message commands
  filesUploaded(): any {
    this.filesUploadedSubject.next();
  }
}
