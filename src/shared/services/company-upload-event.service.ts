import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyUploadEventService {
  
  // Observable string sources
  private companiesUploadedSubject = new Subject<string>();

  // Observable string streams
  getCompaniesUploadedEvent = this.companiesUploadedSubject.asObservable();

  constructor() { }
  
  // Service message commands
  companiesUploaded(): any {
    this.companiesUploadedSubject.next();
  }
}
