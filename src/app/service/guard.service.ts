import { Notify } from 'src/app/template/notify';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GuardService {

    private endpoint = environment.apiUrl;
    currentUser: any;

    constructor(
        private http: HttpClient
    ) { }

    get isAdmin() {
        this.getUser();
        return this.currentUser.role_id == 1;
    }

    setUser(user: any): void {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    getUser(): any {
        if (!this.currentUser && localStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        }
        return this.currentUser;
    }

    clearUser(): void {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    auth(): Observable<any> {
        try {
            var result: Observable<any> = this.http.get(this.endpoint.concat('/autenticacao'));
        } catch (error) {
            Notify.error('Erro ao tentar buscar dados');
        }

        return result!;
    }

    admin(): Observable<any> {
        try {
            var result: Observable<any> = this.http.get(this.endpoint.concat('/admin'));
        } catch (error) {
            Notify.error('Erro ao tentar buscar dados');
        }

        return result!;
    }

    activeBack(): Observable<any> {
        const updates = [{ type: "web", quantity: 1 }];
        const headers = new HttpHeaders({
            'Accept': 'application/vnd.heroku+json; version=3',
            'Authorization': 'Bearer HRKU-0ebc5eb7-5b9c-4a65-b4b8-0b0e70efe112',
        });

        const data: Observable<any> = this.http.patch('https://api.heroku.com/apps/marrige-back/formation', {updates}, {headers}).pipe(
            catchError(error => {
                Notify.error(error.message);
                return throwError(() => error);
            })
        );

        return data;
    }
}
