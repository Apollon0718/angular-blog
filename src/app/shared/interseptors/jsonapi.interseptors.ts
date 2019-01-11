import { HttpErrorResponse, HttpEvent,  HttpHandler,  HttpInterceptor,  HttpRequest,   HttpResponse,  } from '@angular/common/http';

import { Observable, of as observableOf, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Jsona } from 'jsona/lib';
import { TJsonApiBody } from 'jsona/lib/JsonaTypes';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class JsonApiInterseptor implements HttpInterceptor {

    jsona: Jsona;

    constructor(private router: Router) {
        this.jsona = new Jsona();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                const newEvent = event.clone({
                    body: this.jsona.deserialize(event.body as TJsonApiBody)
                });
                return newEvent;
            }
        })).pipe(catchError(x => this.handleError(x)));
    }

    private handleError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this.router.navigate(['auth/login']);
           return observableOf({});
        }
        return throwError(err);
    }
}
