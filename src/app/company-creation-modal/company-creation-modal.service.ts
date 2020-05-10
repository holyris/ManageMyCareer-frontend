import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyCreationModalService {

  // Observable string sources
  private showSubject = new Subject<string>();

  // Observable string streams
  showEvent = this.showSubject.asObservable();

  constructor() { }
  
  // Service message commands
  show(params: any = null): any {
    this.showSubject.next(params);
  }
}
