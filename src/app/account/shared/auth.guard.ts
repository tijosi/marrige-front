
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from 'src/app/service/guard.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {

    constructor(
        private route: Router,
        private rest: GuardService
    ) { }

    canActivate() {
        return this.rest.auth().pipe(
            map((user: any) => {
                if (!user) {
                    this.rest.clearUser();
                    this.route.navigate(['/login']);
                }
                this.rest.setUser(user);
                return true;
            }),
            catchError(() => {
                this.route.navigate(['/login']);
                return of(false);
              })
        )

    }

}
