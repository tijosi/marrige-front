import { Notify } from 'src/app/template/notify';
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

  // canActivate(): Observable<boolean> {
    canActivate() {

    return this.rest.auth().pipe(
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
