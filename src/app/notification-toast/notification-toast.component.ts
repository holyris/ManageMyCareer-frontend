import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification-toast/notification.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-toast',
  templateUrl: './notification-toast.component.html',
  styleUrls: ['./notification-toast.component.scss'],
  providers: [MessageService]
})
export class NotificationToastComponent implements OnInit {
  subscription: Subscription;

  constructor(private notificationService: NotificationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.subscription = this.notificationService.addEvent.subscribe(
      message => {
        this.add(message);
      }
    )
  }

  add(message: any){
    this.messageService.add(message);    
  }

}
