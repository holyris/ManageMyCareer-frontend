import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CompanyModel } from 'src/shared/models/CompanyModel';

@Injectable({
  providedIn: 'root'
})
export class CompanyUpdateModalService {

  // Observable string sources
  private showSubject = new Subject<CompanyModel>();

  // Observable string streams
  showEvent = this.showSubject.asObservable();

  constructor() { }

  // Service message commands
  show(params: any = null): any {
    this.showSubject.next(params);
    console.log(params);
    
  }
}
