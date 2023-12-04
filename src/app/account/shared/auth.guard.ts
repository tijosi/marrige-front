import { Notify } from 'src/app/helper/notify';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from 'src/app/service/guard.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(
    private route: Router,
    private rest: GuardService
  ){}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  canActivate(): Observable<boolean> {

    return this.rest.auth(this.getHeaders()).pipe(
      map((data: any) => {
        if(data) {
          this.rest.setUser(data);
          return true;
        }

        this.rest.clearUser();
        this.route.navigate(['/login']);
        return false;
      }),

      catchError((e: any) => {
        this.route.navigate(['/login']);
        return of(false);
      })
    )

  }

}
