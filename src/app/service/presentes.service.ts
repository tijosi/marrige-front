import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notify } from '../template/notify';
import { environment } from './../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { TransformHelper } from '../helper/TransformHelper';

@Injectable({
    providedIn: 'root'
})
export class PresentesService {
    private endpoint = environment.apiUrl + '/presentes'

    constructor(private http: HttpClient) {}

    get optionsCurrencyBRLMask() {
        return {
            alias: 'numeric',
            radixPoint: ',',
            groupSeparator: '.',
            autoGroup: true,
            prefix: 'R$ ',
            digits: 2,
            digitsOptional: false,
            clearMaskOnLostFocus: false,
        }
    };

    presentes(id?: string): Observable<any> {
        const endpoint = id ? `${this.endpoint}?id=${id}` : this.endpoint;

        const data: Observable<any> = this.http.get(endpoint).pipe(
            catchError(e => {
                Notify.error(e.error.message);
                return throwError(() => e);
            })
        );

        return data;
    }

    savePresente(form: any): Observable<any> {
        let formData = TransformHelper.objectToFormData(form);
        const data: Observable<any> = this.http.post(this.endpoint, formData).pipe(
            catchError(e => {
                Notify.error(e.error.message);
                return throwError(() => e);
            })
        );

        return data;
    }

    confirmarPresente(param: any): Observable<any> {
        const data: Observable<any> = this.http.post(this.endpoint + '/confirmar', param).pipe(
            catchError(e => {
                Notify.error(e.error.message);
                return throwError(() => e);
            })
        );

        return data;
    }

    presentesArea(): Observable<any> {
        const data: Observable<any> = this.http.get(environment.apiUrl + '/enum/presentes-area-enum').pipe(
            catchError(e => {
                Notify.error(e.error.message);
                return throwError(() => e);
            })
        );

        return data;
    }

    excluirPresente(presenteId: any): Observable<any> {
        const data: Observable<any> = this.http.delete(this.endpoint + '?presenteId=' + presenteId).pipe(
            catchError(e => {
                Notify.error(e.error.message);
                return throwError(() => e);
            })
        );

        return data;
    }

    getUsuarios(): Observable<any> {
        const data: Observable<any> = this.http.get(environment.apiUrl + '/database/usuarios').pipe(
            catchError(e => {
                Notify.error(e.error.message);
                return throwError(() => e);
            })
        );

        return data;
    }

    adicionarPagamentoManual(form: any): Observable<any> {
        const data: Observable<any> = this.http.post(this.endpoint + '/adicionar-pagamento-manual', form).pipe(
            catchError(e => {
                Notify.error(e.error.message);
                return throwError(() => e);
            })
        );

        return data;
    }

    cancelarSelecaoPresente(presenteId: any): Observable<any> {
        const data: Observable<any> = this.http.post(this.endpoint + '/cancelar-selecao', {presenteId}).pipe(
            catchError(e => {
                Notify.error(e.error.message);
                return throwError(() => e);
            })
        );

        return data;
    }
}
