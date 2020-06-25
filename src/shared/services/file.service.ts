import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { FileModel } from 'src/shared/models/FileModel';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  private dataSentSubject = new Subject<string>();
  public getDataSentEvent = this.dataSentSubject.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getAll(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(this.filesUrl, this.httpOptions)
      .pipe(
        map(
          (jsonArray: Object[]) => jsonArray.map(jsonItem => FileModel.fromJson(jsonItem))),
        tap(_ => this.log('fetched files')),
        catchError(this.handleError<FileModel[]>('getFiles', []))
      );
  }

  getBlob(file: FileModel): Observable<Blob> {
    return this.http.get(this.filesUrl + file.id, { responseType: 'blob', withCredentials: true });
  }

  download(file: FileModel) {
    this.getBlob(file)
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
        link.download = file.name;
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  getCompanies() {
    return this.http.get<string[]>(this.filesUrl + "companies", this.httpOptions);
  }

  getWorkplaces() {
    return this.http.get<string[]>(this.filesUrl + "workplaces", this.httpOptions);
  }

  async upload(files: Array<FileModel>) {
    for (let index = 0, len = files.length; index < len; ++index) {
      files[index] = await this.transformBlob(files[index]);
    }

    const request = await this.http.post(this.filesUrl, files, this.httpOptions).toPromise();
    let detail = files.length === 1 ? 'Fichier importé' : files.length + ' fichiers importés';
    this.snackBar.open(detail, "Fermer", {
      duration: 2000,
      horizontalPosition: 'end'
    });
    this.alertDataSent();
  }

  async transformBlob(file: FileModel): Promise<FileModel> {
    return new Promise(resolve => {
      let reader = new FileReader();
      //appelle cette fonction quand readAsArrayBuffer est fini
      reader.onload = () => {

        // converti reader.result en base64
        file.fileContent = btoa(
          new Uint8Array(reader.result as ArrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        resolve(file);
      }
      //prend le blob et le converti en tableau binaire dans reader.result
      reader.readAsArrayBuffer(file.blob);
    })

  }

  async update(file: FileModel) {
    const request = await this.http.patch(this.filesUrl, file, this.httpOptions).toPromise();
    this.snackBar.open('Fichier modifié', "Fermer", {
      duration: 2000,
      horizontalPosition: 'end'
    });
    this.alertDataSent();
    return request;
  }

  async delete(files: FileModel[]) {
    let newHttpOptions: any = this.httpOptions;
    newHttpOptions.body = files;
    const request = await this.http.delete(this.filesUrl, newHttpOptions).toPromise();

    let detail = files.length === 1 ? 'Fichier supprimé' : files.length + ' fichiers supprimés';
    this.snackBar.open(detail, "Fermer", {
      duration: 2000,
      horizontalPosition: 'end'
    });

    this.alertDataSent();
    return request;
  }

  alertDataSent() {
    this.dataSentSubject.next();
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
