import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from 'src/app/service/guard.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

    user = this.guard.getUser();

    showHeader: boolean = true;

    constructor(
        private router: Router,
        private guard: GuardService
    ) {}

    ngAfterViewInit(): void {
        this.showHeader = (window.location.pathname !== '/cha-panela') && this.user;
    }
}
