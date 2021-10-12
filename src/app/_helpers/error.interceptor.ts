import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {

        this.authService.logout();
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      }

      let error;
      if ( typeof err.error.errors !== 'undefined' ){
        if(
          err.error.errors.code == 400
        ){
          error = {
            message: err.error.errors.message || err.statusText,
            fields: err.error.errors.fields
          };
        } else {
            error = err.error.errors.message || err.statusText
        }
      } else {
        error = err.statusText
      }

      return throwError(error);
    }));
  }
}
