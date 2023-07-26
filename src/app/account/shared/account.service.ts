import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private endpoint = 'http://localhost:8000/api/login'

  constructor(
    private http: HttpClient
  ) { }

  login(user:any){
    localStorage.clear();
    return this.http.post<any[]>(this.endpoint, user).pipe(
      catchError(error => {
        return of();
      })
    ).subscribe((r: any) => {
      localStorage.setItem('token', r.token);
    });

  }
}
