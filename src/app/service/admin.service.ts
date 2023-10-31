import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notify } from '../helper/notify';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private endpoint = 'http://localhost:8000/api/admin'

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  async getNotificacoes(id: any = '', visto: any = '') {
    const headers = this.getHeaders();

    try {
      var data: any = await this.http.get(this.endpoint.concat('?id='+id+'&visto='+visto), { headers }).toPromise();
    } catch (error) {
      Notify.error('Erro ao tentar buscar dados');
    }

    return data;
  }

  async getPresentes(id: any = '') {
    const headers = this.getHeaders();

    try {

      var data: any = await this.http.get(this.endpoint.concat('/presentes?id='+id), { headers }).toPromise();

      data.sort(function(a: any, b: any){
        return a.valor - b.valor;
      });

      for (const el of data) {
        el.valor = el.valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
      }

    } catch (e: any) {

      if (e.error.message) Notify.error(e.error.message);

    }

    return data;
  }

  async desvincularPresente(id: any = '') {
    const headers = this.getHeaders();

    try {

      var data: any = await this.http.get(this.endpoint.concat('/desvincular-presente?id='+id), { headers }).toPromise();

    } catch (e: any) {

      if (e.error.message) Notify.error(e.error.message);

    }

    return data;
  }

}
