import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard {

  private endpoint = 'https://marrige-back.vercel.app/api/api/valida-admin'

  constructor(
    private http: HttpClient,
    private route: Router
  ){}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  async canActivate() {
    const headers = this.getHeaders()

    try {
      var data: any = await this.http.get(this.endpoint, { headers }).toPromise();
      if(data) return true;
    } catch (error) {
    }

    this.route.navigate(['']);
    return false;

  }
}
