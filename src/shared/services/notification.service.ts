import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

   // Observable string sources
   private addSubject = new Subject<string>();

   // Observable string streams
   addEvent = this.addSubject.asObservable();
 
   constructor() { }
   
   // Service message commands
   add(message: any): any {
     this.addSubject.next(message);
   }
  
}
