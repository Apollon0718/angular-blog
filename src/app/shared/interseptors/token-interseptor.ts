import {  HttpEvent, HttpHandler,  HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterseptor implements HttpInterceptor {

    constructor(public tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.tokenService.getToken()}`
            }
        });
        return next.handle(req);
    }
}
