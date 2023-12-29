import { Notify } from 'src/app/template/notify';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private endpoint = environment.apiUrl + '/login'

  constructor(
    private http: HttpClient
  ) { }

  login(user:any): Observable<any> {

    try {
      var result: Observable<any> = this.http.post(this.endpoint, user);
    } catch (error) {
      Notify.error('Erro ao tentar buscar dados');
    }

    return result!;
  }
}
