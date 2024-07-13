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
        if (request.body instanceof FormData) {
            return new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            });
        } else {
            return new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            });
        }
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const headers = this.getHeaders(request);
        const authReq = request.clone({ headers })
        return next.handle(authReq);
    }
}
