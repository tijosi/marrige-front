import { Notify } from 'src/app/helper/notify';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private endpoint = 'http://localhost:8000/api/login'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async login(user:any){
    localStorage.clear();

    try {
      var data:any = await this.http.post(this.endpoint, user).toPromise();
      localStorage.setItem('token', data.token);
      this.router.navigate(['']);
    } catch (e: any) {

      if (e.error) {
        Notify.error(e.error.message);
        return;
      }

      Notify.error('Erro ao tentar Acessar');
    }
  }
}
