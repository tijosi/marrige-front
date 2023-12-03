import { Notify } from 'src/app/helper/notify';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  private endpoint = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  auth(headers: any): Observable<any> {

    try {
      var result: Observable<any> = this.http.get(this.endpoint.concat('/autenticacao'), {headers});
    } catch (error) {
      Notify.error('Erro ao tentar buscar dados');
    }

    return result!;
  }
}
