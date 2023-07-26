import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { Notify } from '../helper/notify';

@Injectable({
  providedIn: 'root'
})
export class PresentesService {

  private endpoint = 'http://localhost:8000/api/presentes'

  constructor(private http: HttpClient) { }

  async getPresentes() {
    let data = null;

    try {
      data = await this.http.get<any[]>(this.endpoint).toPromise();
    } catch (error) {
      Notify.error('Erro ao tentar buscar dados');
    }

    return data;
  }
}
