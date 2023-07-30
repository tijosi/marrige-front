import { Notify } from 'src/app/helper/notify';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private endpoint = 'http://localhost:8000/api/login'

  constructor(
    private http: HttpClient
  ) { }

  async login(user:any){
    localStorage.clear();

    try {
      var data:any = await this.http.post(this.endpoint, user).toPromise();
      localStorage.setItem('token', data.token);
    } catch (error) {
      Notify.error('Erro ao tentar Acessar');
    }
  }
}
