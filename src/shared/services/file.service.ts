import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { PersonalFile } from '../models/PersonalFile';
import { MessageService } from './message.service';

import { FileModel } from 'src/shared/models/FileModel';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  private filesUrl = 'http://localhost:8080/files/';  // URL to web api

  private httpOptions = {
    withCredentials:true
    // headers: new HttpHeaders({
    //   "Access-Control-Allow-Origin": "*",
    //   'Access-Control-Allow-Method': 'GET, POST, OPTIONS, DELETE',
    //   "Access-Control-Allow-Credentials": "true",
    //   "Access-Control-Allow-Headers": "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept, Authorization"
    // })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  async upload(fileObjects: Array<FileModel>) {
    var formData = new FormData();
    fileObjects.forEach(element => {
      formData.append('file', element.file);
    });

    return await this.http.post(this.filesUrl, formData, this.httpOptions).toPromise();
  }

  getFiles(): Observable<PersonalFile[]> {
    return this.http.get<PersonalFile[]>(this.filesUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched files')),
        catchError(this.handleError<PersonalFile[]>('getFiles', []))
      );
  }

  downloadFile(fileId: string, filename?: string) {
    this.blob(this.filesUrl + fileId)
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

  blob(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob', withCredentials:true },);
  }

  filePreview(fileId: string) {
    return this.http.get(this.filesUrl + fileId, { responseType: 'blob', withCredentials:true })
      .subscribe(blob => {
        let newWindow = window.open('/files/preview');
        newWindow.onload = () => {
          var blobHtmlElement;
          blobHtmlElement = document.createElement('object');
          blobHtmlElement.href = window.URL.createObjectURL(blob);
          blobHtmlElement.style.position = 'fixed';
          blobHtmlElement.style.zIndex = '200';
          blobHtmlElement.style.top = '0';
          blobHtmlElement.style.left = '0';
          blobHtmlElement.style.bottom = '0';
          blobHtmlElement.style.right = '0';
          blobHtmlElement.style.width = '100%';
          blobHtmlElement.style.height = '100%';
          blobHtmlElement.setAttribute('data', blobHtmlElement.href);
          newWindow.document.body.appendChild(blobHtmlElement);
          blobHtmlElement.click();
        };
      });
  }

  deleteFile(fileId: string) {

    return this.http.delete(this.filesUrl + fileId, this.httpOptions).toPromise();

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
    this.messageService.add(`ListeService: ${message}`);
  }



}
