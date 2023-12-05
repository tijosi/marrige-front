import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { GuardService } from 'src/app/service/guard.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard {

  constructor(
    private route: Router,
    private rest: GuardService
  ){}

  canActivate(): Observable<boolean> {

    return this.rest.admin().pipe(
      map((data: any) => {
        if(data) return true;

        this.route.navigate(['']);
        return false;
      }),

      catchError((e: any) => {
        this.route.navigate(['']);
        return of(false);
      })
    )

  }
}
