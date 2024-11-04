import { Notify } from 'src/app/template/notify';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, delay, Observable, of, retry, switchMap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GuardService {
    private endpoint = environment.apiUrl;
    private isAuthorizedSubject = new BehaviorSubject<boolean>(false);

    isAuthorized$ = this.isAuthorizedSubject.asObservable();
    currentUser: any;
    currentApi: any;

    TEMPO_CACHE_MINUTOS = 30;

    constructor(
        private http: HttpClient
    ) { }

    get isAdmin() {
        this.getUser();
        return this.currentUser && (this.currentUser.role_id == 1);
    }

    setCacheAPI(data: { apiLigada: string, dataTime: number }): void {
        localStorage.setItem('apiCache', JSON.stringify(data));
    }

    getCacheAPI(): { apiLigada: string, dataTime: number } | null {
        const cache = localStorage.getItem('apiCache');
        return cache ? JSON.parse(cache) : null;
    }

    setUser(user: any): void {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    setConfirmRead(flg: boolean) {
        let bool = flg ? '1' : '0';
        localStorage.setItem('confirm_read', bool);
    }

    getConfirmRead(): Number {
        return Number(localStorage.getItem('confirm_read')) ?? 0;
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
        return this.http.get(this.endpoint + '/autenticacao').pipe(
            switchMap((user) => {
                this.isAuthorizedSubject.next(true);
                return of(user);
            }),
            catchError(error => {
                this.isAuthorizedSubject.next(false);
                return of(false);
            })
        );
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

        const data: Observable<any> = this.http.patch('https://api.heroku.com/apps/marrige-back/formation', { updates }, { headers }).pipe(
            catchError(error => {
                Notify.error(error.message);
                return throwError(() => error);
            })
        );

        return data;
    }

    API(): Observable<any> {
        const data: Observable<any> = this.http.get(this.endpoint + '/api').pipe(
            catchError(e => {
                return throwError(() => e);
            })
        );

        return data;
    }

    ligarAPI(): Observable<any> {
        const maxTentativas = 1;

        const cacheAPI = this.getCacheAPI();
        const agora = new Date().getTime();

        if (cacheAPI && ((agora - cacheAPI?.dataTime) < this.TEMPO_CACHE_MINUTOS * 60 * 1000)) {
            console.log('Usando dados do cache da API.');
            return of(cacheAPI);
        }

        return this.API().pipe(
            retry(maxTentativas),
            switchMap((response) => {
                const dataAtual = new Date().getTime();
                this.setCacheAPI({ apiLigada: '1', dataTime: dataAtual });
                return of(response);
            }),
            catchError(error => {
                console.log('Falha nas tentativas de conectar à API, chamando activeBack...');
                return this.activeBack().pipe(
                    delay(1000),
                    switchMap(() => {
                        return this.API().pipe(
                            switchMap((response) => {
                                const dataAtual = new Date().getTime();
                                this.setCacheAPI({ apiLigada: '1', dataTime: dataAtual });
                                return of(response);
                            })
                        );
                    })
                );
            })
        );
    }
}
