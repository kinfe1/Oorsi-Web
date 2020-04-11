import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { throwError, of } from "rxjs";
import { Router } from "@angular/router";

/*
  Generated class for the AuthInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
    console.log("Hello AuthInterceptor");
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string = localStorage.getItem("currentUser");
    let pipedNext;
    if (token) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token,
        },
      });
      pipedNext = next.handle(authReq);
    } else {
      pipedNext = next.handle(request);
    }
    pipedNext = pipedNext.pipe(
      // pipe all errors to get unauthorized error and logout user
      catchError((err: any) => {
        console.log("http interceptor", err);
        if (err instanceof HttpErrorResponse) {
          // check if error status is unauthorized (401)
          if (err.status == 401) {
            console.log("Unauthorized response received at HTTP Interceptor");
            this.handleUnauthorizedResponse();
          }
        }
        // pipe error to the observer
        return throwError(err);
      })
    );
    return pipedNext;
  }

  /**
   * method called when an unauthorized response is received to logout
   * the user and route to login.
   */
  handleUnauthorizedResponse() {
    // remove token
    localStorage.removeItem("currentUser");

    // check if route is already at login
    // so no redirect LOOP is not produced.
    if(this.router.isActive('/login', true)) {
      return;
    }

    // go to login page
    this.router.navigateByUrl("/login");
  }
}
