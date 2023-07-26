import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  private endpoint = 'http://localhost:8000/api/valida-token'

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

  canActivate() {
    const headers = this.getHeaders()
    let key = false;
    this.http.get(this.endpoint, { headers }).pipe(
        catchError(error => {
            console.log(error);
            return of();
        })
      ).subscribe((r: any) => {
        key = r;
      }
    )


    if(key) return true;
    else {
      this.route.navigate(['login']);
      return false;
    }


  }
}
