import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    private getHeaders(request: any): HttpHeaders {
        let headers = request.headers;

        if (!headers.has('Authorization')) {
            headers = headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        }

        if (!(request.body instanceof FormData) && !headers.has('Content-Type')) {
            headers = headers.set('Content-Type', 'application/json');
        }

         return headers;
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const headers = this.getHeaders(request);
        const authReq = request.clone({ headers })
        return next.handle(authReq);
    }
}
