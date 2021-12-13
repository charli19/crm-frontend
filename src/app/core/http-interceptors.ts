import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class HttpInterceptors implements HttpInterceptor {
  constructor(public _snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const accessToken = sessionStorage.getItem('access_token');
    let request = req;

    if (accessToken) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(request).pipe(catchError((err) => this.handleError(err)));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 401 && !window.location.pathname.includes('/login')) {
      sessionStorage.removeItem('access_token');
      window.location.replace('/login');
    } else {
      this._snackBar.open('Bad credentials', 'Close', {
        duration: 2000,
      });
    }
    return throwError(() => new Error('401 Aunauthorized'));
  }
}
