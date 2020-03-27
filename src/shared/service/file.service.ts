import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { PersonalFile } from '../model/PersonalFile';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private filesUrl = 'http://localhost:8080/files';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"})
  };


  constructor(private http: HttpClient, private messageService: MessageService) { }

  upload(file: File) {
    if (!file) { return; }

    const formData = new FormData();
    formData.append('file', file);

    const req = this.http.post('http://localhost:8080/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    return req;
  }

  getFiles (): Observable<PersonalFile[]> {
    return this.http.get<PersonalFile[]>(this.filesUrl)
      .pipe(
        tap(_ => this.log('fetched files')),
        catchError(this.handleError<PersonalFile[]>('getFiles', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
