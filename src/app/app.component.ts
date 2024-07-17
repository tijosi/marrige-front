import { Component, OnInit, ViewChild } from '@angular/core';
import { GuardService } from './service/guard.service';

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

        this.activeIntro = true;
        setTimeout(() => {
            if (this.gaurdService.isAuthorized$) this.activeIntro = false;
        }, 7200);
    }
}
