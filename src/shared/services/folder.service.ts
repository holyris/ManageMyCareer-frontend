import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FileModel } from '../models/FileModel';
import { map } from 'rxjs/operators';
import { Folder } from '../models/Folder';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private url = 'http://localhost:8080/folders/';  // URL to web api

  private httpOptions = {
    withCredentials: true
  };

  private dataSentSubject = new Subject<string>();
  public getDataSentEvent = this.dataSentSubject.asObservable();

  private deleteSubject = new Subject<string>();
  public getDeleteEvent = this.deleteSubject.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getAll(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.url, this.httpOptions);
  }

  getTree(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.url + "tree", this.httpOptions);
  }

  getFilesById(folderId: string): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(this.url + folderId + "/files", this.httpOptions)
      .pipe(
        map(
          (jsonArray: Object[]) => jsonArray.map(jsonItem => FileModel.fromJson(jsonItem)))
      );
  }

  async create(folder: Folder) {
    const request = await this.http.post(this.url, folder, this.httpOptions).toPromise();
    this.snackBar.open('Dossier crée', "Fermer", {
      duration: 2000,
      horizontalPosition: 'end'
    }); 
    this.alertDataSent();
    return request;
  }

  async update(folder: Folder) {
    const request = await this.http.patch(this.url, folder, this.httpOptions).toPromise();
    this.snackBar.open('Dossier modifié', "Fermer", {
      duration: 2000,
      horizontalPosition: 'end'
    }); 
    this.alertDataSent();
    return request;
  }

  async delete(id: number) {
    const request = await this.http.delete(this.url + id, this.httpOptions).toPromise();
    this.snackBar.open('Dossier supprimé', "Fermer", {
      duration: 2000,
      horizontalPosition: 'end'
    }); 
    this.alertDataSent();
    this.alertDelete();
    return request;
  }

  alertDataSent() {
    this.dataSentSubject.next();
  }

  alertDelete() {
    this.deleteSubject.next();
  }
}




