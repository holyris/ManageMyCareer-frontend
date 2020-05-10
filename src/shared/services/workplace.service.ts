import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/notification-toast/notification.service';
import { WorkplaceModel } from '../models/WorkplaceModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceService {

  private url = 'http://localhost:8080/workplaces/';
  private httpOptions = {
    withCredentials: true
  };

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getAll(): Observable<WorkplaceModel[]> {
    return this.http.get<WorkplaceModel[]>(this.url, this.httpOptions)
      .pipe(
        map(
          (jsonArray: Object[]) => jsonArray.map(jsonItem => WorkplaceModel.fromJson(jsonItem)))
      );
  }

  async create(workplace: WorkplaceModel) {
    const request = await this.http.post(this.url, workplace, this.httpOptions).toPromise();
    this.notificationService.add({ severity: 'success', detail: 'Poste ajoutée' });
    return request;
  }
}
