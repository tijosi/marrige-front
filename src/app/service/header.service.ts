import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  async getIsAdmin() {
    const headers = this.getHeaders();

    try {
      await this.http.get(environment + '/valida-admin', { headers }).toPromise();
    } catch (error) {
      return false;
    }

    return true;
  }

}
