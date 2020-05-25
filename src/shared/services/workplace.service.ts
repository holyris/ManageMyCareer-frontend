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

  async update(workplace: WorkplaceModel) {
    const request = await this.http.patch(this.url, workplace, this.httpOptions).toPromise();
    this.notificationService.add({ severity: 'success', detail: 'Poste modifié' });
    return request;
  }

  async delete(id: Number) {
    const request = this.http.delete(this.url + id, this.httpOptions).toPromise();
    return request;
  }

  async deleteMultiple(workplaces: WorkplaceModel[]) {
    for (const workplace of workplaces) {
      await this.delete(workplace.id);
    }
    const length = workplaces.length
    let detail = "";
    if (length > 1) {
      detail = length + ' postes supprimés'
    }
    else {
      detail = length + ' poste supprimé'
    }
    this.notificationService.add({ severity: 'success', detail: detail });
  }
}
