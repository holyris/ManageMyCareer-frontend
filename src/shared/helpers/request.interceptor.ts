import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (error.status === 401 || error.status === 403) {
      this.authenticationService.logout();
    }
    return throwError(error);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleAuthError(error);
        })
      );
  }
}
