import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notify } from '../template/notify';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { TransformHelper } from '../helper/TransformHelper';

@Injectable({
  providedIn: 'root'
})
export class PresentesService {

  private endpoint = environment.apiUrl + '/presentes'

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  presentes(): Observable<any> {
    const headers = this.getHeaders();

    try {
      var data: Observable<any> = this.http.get(this.endpoint, { headers });
    } catch (error) {
      Notify.error('Erro ao tentar buscar dados');
    }

    return data!;
  }

  savePresente(form: any): Observable<any> {
    const headers = this.getHeaders();

    const formData = TransformHelper.objectToFormData(form);

    try {
      var data: Observable<any> = this.http.post(this.endpoint, formData, { headers });
    } catch (error) {
      Notify.error('Erro ao tentar buscar dados');
    }

    return data!;
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
