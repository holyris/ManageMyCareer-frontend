import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { PersonalFile } from '../models/PersonalFile';

import { FileModel } from 'src/shared/models/FileModel';
import { NotificationService } from '../../app/notification-toast/notification.service';


@Injectable({
  providedIn: 'root',
})
export class FileService {
  private filesUrl = 'http://localhost:8080/files/';  // URL to web api

  private httpOptions = {
    withCredentials: true
    // headers: new HttpHeaders({
    //   "Access-Control-Allow-Origin": "*",
    //   'Access-Control-Allow-Method': 'GET, POST, OPTIONS, DELETE',
    //   "Access-Control-Allow-Credentials": "true",
    //   "Access-Control-Allow-Headers": "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept, Authorization"
    // })
  };

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  async upload(fileObjects: Array<FileModel>) {
    //à garder au cas où on reparte sur les multiparts
    // fileObjects.forEach(element => {
    //   formData.append('file', element.file);
    // });
    const request = await this.http.post(this.filesUrl, fileObjects, this.httpOptions).toPromise();
    const length = Object.keys(request).length
    let detail = "";
    if (length > 1) {
      detail = length + ' fichiers importés'
    }
    else {
      detail = length + ' fichier importé'
    }
    this.notificationService.add({ severity: 'success', detail: detail });
    return request
  }

  async update(file: FileModel) {
    const request = await this.http.patch(this.filesUrl, file, this.httpOptions).toPromise();
    this.notificationService.add({ severity: 'success', detail: 'Fichier modifié' });
    return request;
  }

  getAll(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(this.filesUrl, this.httpOptions)
      .pipe(
        map(
          (jsonArray: Object[]) => jsonArray.map(jsonItem => FileModel.fromJson(jsonItem))),
        tap(_ => this.log('fetched files')),
        catchError(this.handleError<FileModel[]>('getFiles', []))
      );
  }

  getBlob(id: Number): Observable<Blob> {
    return this.http.get(this.filesUrl + id, { responseType: 'blob', withCredentials: true });
  }

  download(id: Number, filename?: string) {
    this.getBlob(id)
      .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: "application/pdf" });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = filename;
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  async delete(id: Number) {
    const request = this.http.delete(this.filesUrl + id, this.httpOptions).toPromise();
    return request;
  }

  async deleteMultiple(files: FileModel[]) {
    for (const file of files) {
      await this.delete(file.id);
    }
    const length = files.length
    let detail = "";
    if (length > 1) {
      detail = length + ' fichiers supprimés'
    }
    else {
      detail = length + ' fichier supprimé'
    }
    this.notificationService.add({ severity: 'success', detail: detail });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ListeService message with the MessageService */
  private log(message: string) {

  }
}
