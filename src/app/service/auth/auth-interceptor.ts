import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
    console.log('Hello AuthInterceptor');
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = localStorage.getItem('currentUser');
    if (token) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token
        }
      });
      return next.handle(authReq)
    } else {
      return next.handle(request)
    }

  }
}
