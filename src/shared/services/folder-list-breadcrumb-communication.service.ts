import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FolderNode } from '../models/FolderNode';

@Injectable({
  providedIn: 'root'
})
export class FolderListBreadcrumbCommunicationService {

  private folderChangedSubject = new Subject<FolderNode[]>();
  public getFolderChangedEvent = this.folderChangedSubject.asObservable();

  alertFolderChanged(params: FolderNode[]) {
    this.folderChangedSubject.next(params);
  }


}
