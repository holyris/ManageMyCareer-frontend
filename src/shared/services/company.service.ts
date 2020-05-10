import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CompanyModel } from '../models/CompanyModel';
import { NotificationService } from 'src/app/notification-toast/notification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url = 'http://localhost:8080/companies/';
  private httpOptions = {
    withCredentials: true
  };

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getAll(): Observable<CompanyModel[]> {
    return this.http.get<CompanyModel[]>(this.url, this.httpOptions)
      .pipe(
        map(
          (jsonArray: Object[]) => jsonArray.map(jsonItem => CompanyModel.fromJson(jsonItem)))
      );
  }

  async create(company: CompanyModel) {
    const request = await this.http.post(this.url, company, this.httpOptions).toPromise();
    this.notificationService.add({ severity: 'success', detail: 'Entreprise ajoutée' });
    return request;
  }



}
