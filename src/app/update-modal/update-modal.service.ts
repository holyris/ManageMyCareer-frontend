import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FileModel } from 'src/shared/models/FileModel';

@Injectable({
  providedIn: 'root'
})
export class UpdateModalService {

  // Observable string sources
  private showSubject = new Subject<FileModel>();

  // Observable string streams
  showEvent = this.showSubject.asObservable();

  constructor() { }
  
  // Service message commands
  show(params: any = null): any {
    this.showSubject.next(params);
  }
  
}
