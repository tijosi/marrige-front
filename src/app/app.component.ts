import { Component, OnInit, ViewChild } from '@angular/core';
import { GuardService } from './service/guard.service';
import * as moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    activeIntro: boolean = false;

    title = 'Swelen & Edson';

    constructor(
        private gaurdService: GuardService,
    ) {}

    ngOnInit() {
        this.activeLoading();
    }

    activeLoading(login: boolean = false) {
        if (window.location.pathname == '/login' && !login) return;

        this.activeIntro    = true;
        const maxDelay      = 4000;
        const startTime     = moment();

        this.gaurdService.ligarAPI().subscribe().add(() => {
            const elapsedTime = moment().diff(startTime);
            const remainingTime = Math.max(0, maxDelay - elapsedTime);
            setTimeout(() => this.activeIntro = false, remainingTime)
        });
    }
}
