import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GuardService } from 'src/app/service/guard.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    active: boolean = false;
    canActive: boolean = false;

    constructor(
        private gaurdService: GuardService,
    ) {}

    ngOnInit() {
        this.gaurdService.auth().subscribe({
            next: () => {
                this.canActive = true;
            },
            error: (err: HttpErrorResponse) => {
                if (err.message.includes('Http failure response for https://marrige-back-a7da80137ead.herokuapp.com/api')) {
                    this.gaurdService.activeBack().subscribe({
                        next: () => {
                            this.canActive = true;
                        },
                        error: (err) => {
                            this.canActive = false;
                        }
                    })
                }
            }
        })

        setTimeout(() => {
            if (this.canActive) this.active = true;
        }, 7300);
    }

}
