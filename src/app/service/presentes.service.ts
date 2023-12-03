import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notify } from '../helper/notify';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresentesService {

  private endpoint = environment + '/presentes'

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  async getPresentes() {
    const headers = this.getHeaders()
    try {
      var data: any = await this.http.get(this.endpoint, { headers }).toPromise();
    } catch (error) {
      Notify.error('Erro ao tentar buscar dados');
    }

    data.sort(function(a: any, b: any){
      return a.valor - b.valor;
    });

    for (const el of data) {
      el.valor = el.valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
    }

    return data;
  }

  async confirmPresente(item: any) {
    const headers = this.getHeaders()
    try {
      var data: any = await this.http.post(this.endpoint.concat('/confirm-presente'), item, { headers }).toPromise();
      Notify.success('MUITO OBRIGADOOOO💖💖');
    } catch (error) {
      Notify.error('Erro ao tentar confirmar Item');
    }

    return data;
  }
}
